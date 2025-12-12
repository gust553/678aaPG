const express = require('express');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();

// Trust proxy (important when behind Render / CloudFlare / proxies)
app.set('trust proxy', true);

const PORT = process.env.PORT || 3000;
const storageDir = __dirname;

// helpers
const readJSON = (file) => {
  try {
    if(!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
};
const writeJSON = (file, data) => {
  try { fs.writeFileSync(file, JSON.stringify(data, null, 2)); } catch(e){ console.error('write error', e); }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static serve (public is one level up)
app.use('/', express.static(path.join(__dirname, '../public')));

// light rate limiter to avoid spam
const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 50
});
app.use(limiter);

// visit endpoint
app.post('/api/visit', (req, res) => {
  try {
    const file = path.join(storageDir, 'visits.json');
    const arr = readJSON(file);
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,8),
      ts: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      ua: req.headers['user-agent'] || '',
      referrer: req.body.referrer || req.get('Referrer') || '',
      params: req.body.params || {}
    };
    arr.push(item);
    writeJSON(file, arr);
    res.json({ ok: true });
  } catch (err) {
    console.error('visit err', err);
    res.status(500).json({ ok: false });
  }
});

// click endpoint (returns redirect)
app.post('/api/click', (req, res) => {
  try {
    const file = path.join(storageDir, 'clicks.json');
    const arr = readJSON(file);
    const params = req.body.params || {};
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,8),
      ts: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      ua: req.headers['user-agent'] || '',
      params
    };
    arr.push(item);
    writeJSON(file, arr);

    // build affiliate link with params if any
    const base = 'https://www.678aaPG.vip/?id=750701767';
    try {
      const url = new URL(base);
      Object.keys(params).forEach(k => {
        if(params[k]) url.searchParams.set(k, params[k]);
      });
      return res.json({ ok: true, redirect: url.toString() });
    } catch (e) {
      return res.json({ ok: true, redirect: base });
    }
  } catch (err) {
    console.error('click err', err);
    res.status(500).json({ ok: false });
  }
});

// postback endpoint (to register conversions from external source)
app.get('/api/postback', (req, res) => {
  try {
    const file = path.join(storageDir, 'conversions.json');
    const arr = readJSON(file);
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2,8),
      ts: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      ua: req.headers['user-agent'] || '',
      query: req.query || {}
    };
    arr.push(item);
    writeJSON(file, arr);
    res.send('ok');
  } catch (e) {
    res.status(500).send('err');
  }
});

// stats
app.get('/api/stats', (req, res) => {
  try {
    const visits = readJSON(path.join(storageDir, 'visits.json'));
    const clicks = readJSON(path.join(storageDir, 'clicks.json'));
    const convs = readJSON(path.join(storageDir, 'conversions.json'));
    res.json({
      visits: visits.length,
      clicks: clicks.length,
      conversions: convs.length,
      lastVisit: visits.length ? visits[visits.length - 1] : null,
      lastClick: clicks.length ? clicks[clicks.length - 1] : null,
      lastConversion: convs.length ? convs[convs.length - 1] : null
    });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

// raw JSON (protected-ish)
app.get('/api/raw/:file', (req, res) => {
  const allowed = ['visits.json','clicks.json','conversions.json'];
  const fname = req.params.file;
  if(!allowed.includes(fname)) return res.status(403).send('forbidden');
  const file = path.join(storageDir, fname);
  if(!fs.existsSync(file)) return res.status(404).send('not found');
  res.sendFile(file);
});

// start
app.listen(PORT, () => console.log('Server on port', PORT));

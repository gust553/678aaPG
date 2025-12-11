const express = require('express');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// helpers simples
const writeJSON = (file, obj) => {
  try { fs.writeFileSync(file, JSON.stringify(obj, null, 2)); } catch (e) { console.error('writeJSON err', e); }
};
const readJSON = (file) => {
  try { if (!fs.existsSync(file)) return []; return JSON.parse(fs.readFileSync(file)); } catch (e) { return []; }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../public')));

const limiter = rateLimit({ windowMs: 10 * 1000, max: 50 });
app.use(limiter);

app.post('/api/visit', (req, res) => {
  const file = path.join(__dirname, 'visits.json');
  const arr = readJSON(file);
  const item = { id: Date.now() + Math.random().toString(36).slice(2, 8), ts: new Date().toISOString(), ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, ua: req.headers['user-agent'] || '', referrer: req.body.referrer || req.get('Referrer') || '', params: req.body.params || {} };
  arr.push(item); writeJSON(file, arr); res.json({ ok: true });
});

app.post('/api/click', (req, res) => {
  try {
    const file = path.join(__dirname, 'clicks.json');
    const arr = readJSON(file);
    const params = req.body.params || {};
    const item = { id: Date.now() + Math.random().toString(36).slice(2, 8), ts: new Date().toISOString(), ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, ua: req.headers['user-agent'] || '', params };
    arr.push(item); writeJSON(file, arr);
    const baseAffiliate = 'https://www.678aapg.vip/?id=750701767';
    const url = new URL(baseAffiliate);
    Object.keys(params).forEach(k => { if (params[k]) url.searchParams.set(k, params[k]); });
    return res.json({ ok: true, redirect: url.toString() });
  } catch (err) { console.error(err); return res.status(500).json({ ok: false, error: 'server_error' }); }
});

app.get('/api/postback', (req, res) => {
  const file = path.join(__dirname, 'conversions.json');
  const arr = readJSON(file);
  const item = { id: Date.now() + Math.random().toString(36).slice(2, 8), ts: new Date().toISOString(), ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress, ua: req.headers['user-agent'] || '', query: req.query || {} };
  arr.push(item); writeJSON(file, arr); res.send('ok');
});

app.get('/api/stats', (req, res) => {
  const visits = readJSON(path.join(__dirname, 'visits.json'));
  const clicks = readJSON(path.join(__dirname, 'clicks.json'));
  const convs = readJSON(path.join(__dirname, 'conversions.json'));
  res.json({ visits: visits.length, clicks: clicks.length, conversions: convs.length, lastVisit: visits.length ? visits[visits.length - 1] : null, lastClick: clicks.length ? clicks[clicks.length - 1] : null, lastConversion: convs.length ? convs[convs.length - 1] : null });
});

app.get('/api/raw/:file', (req, res) => {
  const fname = req.params.file; const allowed = ['visits.json','clicks.json','conversions.json']; if(!allowed.includes(fname)) return res.status(403).send('forbidden'); const file = path.join(__dirname, fname); if(!fs.existsSync(file)) return res.status(404).send('not found'); res.sendFile(file);
});

app.listen(PORT, () => console.log('Server on port', PORT));
(function(){
  const AFF_BASE = 'https://www.678aaPG.vip/?id=750701767'; // seu link de afiliado (alterar se precisar)
  const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());

  async function recordVisit(){
    try{
      await fetch('/api/visit', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ referrer: document.referrer || '', params })
      });
    }catch(e){ /* silencioso */ }
  }

  function buildAffiliate(paramsObj){
    try{
      const url = new URL(AFF_BASE);
      Object.keys(paramsObj||{}).forEach(k => url.searchParams.set(k, paramsObj[k]));
      return url.toString();
    }catch(e){
      return AFF_BASE;
    }
  }

  async function handleInstallClick(e){
    e && e.preventDefault && e.preventDefault();
    try{
      const res = await fetch('/api/click', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ params })
      });
      const json = await res.json();
      if(json && json.redirect){
        window.location.href = json.redirect;
        return;
      }
    }catch(err){
      // ignore
    }
    // fallback
    window.location.href = buildAffiliate(params);
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
    recordVisit();
    const b = document.getElementById('installBtn');
    if(b) b.addEventListener('click', handleInstallClick);
  });
})();

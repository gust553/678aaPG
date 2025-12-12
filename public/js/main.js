(function(){
  const AFF_BASE = 'https://www.678aapg.vip/?id=750701767';
  const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
  async function recordVisit(){
    try{ await fetch('/api/visit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ referrer: document.referrer || '', params }) }); }catch(e){}
  }
  recordVisit();
  function buildAffiliate(paramsObj){
    const url = new URL(AFF_BASE);
    Object.keys(paramsObj||{}).forEach(k=>url.searchParams.set(k, paramsObj[k]));
    return url.toString();
  }
  async function handleInstallClick(e){
    e.preventDefault();
    try{
      const res = await fetch('/api/click', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ params }) });
      const json = await res.json();
      if(json && json.redirect){ window.location.href = json.redirect; return; }
    }catch(err){}
    window.location.href = buildAffiliate(params);
  }
  document.addEventListener('DOMContentLoaded', ()=>{
    const b1 = document.getElementById('installBtn');
    const b2 = document.getElementById('installBtnTop');
    if(b1) b1.addEventListener('click', handleInstallClick);
    if(b2) b2.addEventListener('click', handleInstallClick);
    document.getElementById('year').textContent = new Date().getFullYear();
  });
})();
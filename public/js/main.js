(function(){
  const AFF = 'https://www.678aapg.vip/?id=750701767';
  // pega params
  const params = new URLSearchParams(window.location.search);
  const extra = params.toString();
  const url = AFF + (extra ? '&' + extra : '');

  document.addEventListener('DOMContentLoaded', ()=>{
    const b1 = document.getElementById('installBtn');
    const b2 = document.getElementById('installBtnTop');
    if(b1) b1.href = url;
    if(b2) b2.href = url;
    document.getElementById('year').textContent = new Date().getFullYear();
  });

  // opcional: tracking simple click
  document.addEventListener('click',(e)=>{
    if(e.target && (e.target.id==='installBtn' || e.target.id==='installBtnTop')){
      // aqui você pode adicionar pixel/analytics
      console.log('Instalar click ->', url);
    }
  });
})();
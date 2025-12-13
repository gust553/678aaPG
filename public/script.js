// ===== CONFIG =====
const AFFILIATE = "https://www.678aapg.vip/?id=750701767"; // <--- seu link de afiliado
// ===================

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("installButton");
  const topBtn = document.getElementById("topInstall");

  // Aplica o link ao botão principal e ao top
  if(btn) btn.setAttribute("href", AFFILIATE);
  if(topBtn) topBtn.setAttribute("href", AFFILIATE);

  // Abre em nova aba por segurança (ou manter mesma aba se preferir)
  [btn, topBtn].forEach(el => {
    if (!el) return;
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
    // evita duplo clique
 el.addEventListener("click", (e) => {
  e.preventDefault();

  // 🔥 Evento de clique no Meta Pixel
  if (typeof fbq === "function") {
    fbq("track", "Lead");
  }

  // abre o link normalmente
  window.open(AFFILIATE, "_blank");
});
  });

  // carrossel: suavizar scroll ao tocar na borda
  const carousel = document.getElementById("carousel");
  if(carousel){
    carousel.addEventListener("wheel", (e) => {
      // permitir scroll horizontal com roda do mouse (desktop)
      if(Math.abs(e.deltaX) < Math.abs(e.deltaY)){
        carousel.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, {passive:false});
  }
});


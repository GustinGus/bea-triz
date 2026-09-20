(() => {
  'use strict';

  // Revelação das rosas por trás das fotos no toque (mobile/tablet sem
  // hover persistente). Em desktop, o :hover do CSS já cuida do efeito;
  // este script apenas adiciona um estado equivalente ao toque/clique,
  // já que hover não é confiável em telas sensíveis ao toque.
  const photos = Array.from(document.querySelectorAll('.photo'));
  if (!photos.length) return;

  function closeAll(except) {
    photos.forEach((photo) => {
      if (photo !== except) photo.classList.remove('is-active');
    });
  }

  photos.forEach((photo) => {
    photo.addEventListener('click', (event) => {
      const isActive = photo.classList.contains('is-active');
      closeAll(photo);
      photo.classList.toggle('is-active', !isActive);
      event.stopPropagation();
    });
  });

  document.addEventListener('click', () => closeAll(null));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll(null);
  });

  // Revelação progressiva ao rolar: cada foto aparece (fade + leve subida)
  // quando entra na viewport, dando ritmo à leitura da carta. Em
  // prefers-reduced-motion o CSS já força o estado final visível, então
  // aqui só evitamos o custo do observer. Só começa a observar depois que
  // a carta é revelada (evento disparado por app.js) — antes disso a
  // seção fica "inert" fora da tela, e não há razão para medir posição.
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function startReveal() {
    if (reduceMotionQuery.matches || !('IntersectionObserver' in window)) {
      photos.forEach((photo) => photo.classList.add('is-visible'));
      return;
    }
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    photos.forEach((photo) => revealObserver.observe(photo));
  }

  document.addEventListener('letter:revealed', startReveal, { once: true });
})();

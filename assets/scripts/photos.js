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
})();

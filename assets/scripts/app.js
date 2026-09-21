(() => {
  'use strict';

  const body = document.body;
  const startButton = document.getElementById('start-button');
  const screenIntro = document.getElementById('screen-intro');
  const screenLetter = document.getElementById('screen-letter');
  const audio = document.getElementById('bg-audio');
  const musicToggle = document.getElementById('music-toggle');

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const transitionDuration = () => (reducedMotionQuery.matches ? 220 : 900);

  audio.volume = 0.35;

  let started = false;

  function setMusicToggleState(isPlaying) {
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    musicToggle.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproduzir música');
  }

  function tryPlayAudio() {
    const playResult = audio.play();
    if (playResult && typeof playResult.catch === 'function') {
      // Autoplay pode ser bloqueado mesmo dentro do gesto em alguns
      // navegadores (ex.: arquivo de música ainda não adicionado). Falha
      // silenciosamente: o botão de música continua disponível para o
      // usuário iniciar manualmente.
      playResult.catch(() => {
        setMusicToggleState(false);
      });
    }
  }

  function revealLetter() {
    if (started) return;
    started = true;

    // A reprodução precisa ser chamada de forma síncrona dentro do
    // próprio gesto de clique para respeitar a política de autoplay
    // dos navegadores.
    tryPlayAudio();

    body.dataset.stage = 'letter';

    screenIntro.setAttribute('inert', '');
    screenIntro.setAttribute('aria-hidden', 'true');

    screenLetter.removeAttribute('inert');
    screenLetter.removeAttribute('aria-hidden');

    musicToggle.hidden = false;

    document.dispatchEvent(new CustomEvent('letter:revealed'));

    // Move o foco para a carta ao final da transição, para quem navega
    // por teclado/leitor de tela perceber a mudança de contexto.
    window.setTimeout(() => {
      screenLetter.focus({ preventScroll: true });
    }, transitionDuration());
  }

  startButton.addEventListener('click', revealLetter);

  musicToggle.addEventListener('click', () => {
    if (audio.paused) {
      tryPlayAudio();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => setMusicToggleState(true));
  audio.addEventListener('pause', () => setMusicToggleState(false));
  audio.addEventListener('error', () => setMusicToggleState(false));
})();

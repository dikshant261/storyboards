window.AudioBus = (function () {
  const sounds = {
    click: new Audio('assets/sfx/tap.mp3'),
  };
  Object.values(sounds).forEach((a) => {
    a.preload = 'auto';
    a.volume = 0.6;
  });
  function play(name) {
    const a = sounds[name];
    if (!a || document.hidden) return;
    try {
      a.currentTime = 0;
      a.play().catch(() => {});
    } catch {}
  }
  return { play };
})();

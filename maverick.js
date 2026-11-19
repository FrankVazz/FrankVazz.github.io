const conceptVideo = document.querySelector('#concept-video');
const videoDescription = document.querySelector('#video-description');
const videoOptions = {
  short: { file: 'maverick-short.mp4', description: '18-second accelerated CAD animation with music.' },
  long: { file: 'maverick-long.mp4', description: '80-second CAD animation with music.' }
};

document.querySelectorAll('[data-video]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const option = videoOptions[button.dataset.video];
    conceptVideo.pause();
    conceptVideo.src = option.file;
    conceptVideo.setAttribute('aria-label', option.description);
    conceptVideo.load();
    videoDescription.textContent = option.description;
    document.querySelectorAll('[data-video]').forEach((choice) => {
      choice.setAttribute('aria-pressed', String(choice === button));
    });
  });
});

const navigationLoader = document.querySelector('.navigation-loader');
document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const destination = new URL(link.href, window.location.href);
    const isNewPage = destination.origin === window.location.origin && destination.pathname !== window.location.pathname;
    if (!navigationLoader || !isNewPage || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
    navigationLoader.hidden = false;
    window.setTimeout(() => { navigationLoader.hidden = true; }, 8000);
  });
});
window.addEventListener('pageshow', () => {
  if (navigationLoader) navigationLoader.hidden = true;
});

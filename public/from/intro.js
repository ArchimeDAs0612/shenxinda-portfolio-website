// The destination is a fixed local link, never an untrusted redirect parameter.
const destination = document.getElementById('continue');
if (destination) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const leave = () => {
    try { window.sessionStorage.setItem('portfolio-opening-shown', '1'); } catch { /* Storage may be disabled. */ }
    document.body.classList.add('leaving');
    window.setTimeout(() => window.location.replace(destination.href), reducedMotion ? 0 : 330);
  };
  window.setTimeout(leave, reducedMotion ? 60 : 1050);
  destination.addEventListener('click', () => {
    try { window.sessionStorage.setItem('portfolio-opening-shown', '1'); } catch { /* Continue without storage. */ }
  });
}

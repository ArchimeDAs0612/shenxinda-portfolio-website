// The destination is a fixed local link, never an untrusted redirect parameter.
const destination = document.getElementById('continue');
if (destination) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const leave = () => {
    document.body.classList.add('leaving');
    window.setTimeout(() => window.location.replace(destination.href), reducedMotion ? 0 : 330);
  };
  window.setTimeout(leave, reducedMotion ? 60 : 1050);
}

(() => {
  const entries = [...document.querySelectorAll('details.version-entry')];
  if (!entries.length || !window.location.hash) return;

  let id;
  try {
    id = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    id = window.location.hash.slice(1);
  }

  const target = document.getElementById(id);
  if (!target || !target.matches('details.version-entry')) return;

  entries.forEach((entry) => {
    entry.open = entry === target;
  });

  requestAnimationFrame(() => {
    target.scrollIntoView({ block: 'start' });
  });
})();

(() => {
  const map = document.querySelector('.constellation-map');
  const inspector = document.querySelector('.constellation-inspector');
  if (!map || !inspector) return;

  const nodes = [...map.querySelectorAll('.constellation-node')];
  const lines = [...map.querySelectorAll('.constellation-lines line')];
  const kind = inspector.querySelector('.inspector-kind');
  const title = inspector.querySelector('h3');
  const description = inspector.querySelector('.inspector-description');
  const meta = inspector.querySelector('.inspector-meta');
  const link = inspector.querySelector('.inspector-link');

  function selectNode(node) {
    const id = node.dataset.node;
    const connected = new Set([id]);

    lines.forEach((line) => {
      const active = line.dataset.from === id || line.dataset.to === id;
      line.classList.toggle('is-active', active);
      if (active) {
        connected.add(line.dataset.from);
        connected.add(line.dataset.to);
      }
    });

    nodes.forEach((item) => {
      item.classList.toggle('is-active', item === node);
      item.classList.toggle('is-connected', connected.has(item.dataset.node) && item !== node);
      item.setAttribute('aria-pressed', item === node ? 'true' : 'false');
    });

    map.classList.add('has-selection');
    kind.textContent = node.dataset.kind || '';
    title.textContent = node.dataset.title || '';
    description.textContent = node.dataset.description || '';
    meta.textContent = node.dataset.meta || '';

    if (node.dataset.url) {
      link.href = node.dataset.url;
      link.hidden = false;
    } else {
      link.removeAttribute('href');
      link.hidden = true;
    }
  }

  nodes.forEach((node) => node.addEventListener('click', () => selectNode(node)));
  const initial = map.querySelector('.constellation-node.is-active') || nodes[0];
  if (initial) selectNode(initial);
})();

(() => {
  const map = document.querySelector('.constellation-map');
  const inspector = document.querySelector('.constellation-inspector');
  if (!map || !inspector) return;

  const nodes = [...map.querySelectorAll('.constellation-node')];
  const lines = [...map.querySelectorAll('.constellation-lines line')];
  const focusButtons = [...document.querySelectorAll('.constellation-focus [data-focus]')];
  const nodeById = new Map(nodes.map((node) => [node.dataset.node, node]));
  const kind = inspector.querySelector('.inspector-kind');
  const title = inspector.querySelector('h3');
  const description = inspector.querySelector('.inspector-description');
  const meta = inspector.querySelector('.inspector-meta');
  const link = inspector.querySelector('.inspector-link');
  const preferredNode = {
    'yoon-s': 'p-equality',
    'ho-yejin': 'p-glp1'
  };

  function selectNode(node) {
    if (!node) return;
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

  function setFocus(requested, updateUrl = true) {
    const allowed = new Set(['all', 'yoon-s', 'ho-yejin']);
    const focus = allowed.has(requested) ? requested : 'all';
    map.dataset.researcherFocus = focus;

    nodes.forEach((node) => {
      node.classList.toggle('is-focus-muted', focus !== 'all' && node.dataset.researcher !== focus);
    });

    lines.forEach((line) => {
      const from = nodeById.get(line.dataset.from);
      const to = nodeById.get(line.dataset.to);
      const belongs = from?.dataset.researcher === focus && to?.dataset.researcher === focus;
      line.classList.toggle('is-focus-muted', focus !== 'all' && !belongs);
    });

    focusButtons.forEach((button) => {
      const active = button.dataset.focus === focus;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      if (focus === 'all') url.searchParams.delete('researcher');
      else url.searchParams.set('researcher', focus);
      window.history.replaceState({}, '', url);
    }

    const preferred = nodeById.get(preferredNode[focus]);
    if (preferred) selectNode(preferred);
    else if (focus === 'all') selectNode(nodeById.get('p-equality') || nodes[0]);
  }

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      if (node.classList.contains('is-focus-muted')) setFocus('all');
      selectNode(node);
    });
  });

  focusButtons.forEach((button) => {
    button.addEventListener('click', () => setFocus(button.dataset.focus));
  });

  const requestedFocus = new URLSearchParams(window.location.search).get('researcher') || 'all';
  setFocus(requestedFocus, false);
})();

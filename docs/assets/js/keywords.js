(() => {
  const grid = document.querySelector('[data-keyword-grid]');
  const inspector = document.querySelector('#keyword-inspector');
  if (!grid || !inspector) return;

  const drawers = [...grid.querySelectorAll('[data-keyword-drawer]')];
  const search = document.querySelector('[data-keyword-search]');
  const sort = document.querySelector('[data-keyword-sort]');
  const authorButtons = [...document.querySelectorAll('[data-keyword-author]')];
  const visibleCount = document.querySelector('[data-keyword-visible]');
  const empty = document.querySelector('[data-keyword-empty]');
  let author = 'all';

  function applyView() {
    const query = (search?.value || '').trim().toLocaleLowerCase('ko');
    let visible = 0;
    drawers.forEach((drawer) => {
      const matchesText = !query || drawer.dataset.term.includes(query);
      const matchesAuthor = author === 'all' || drawer.dataset.authors.split('|').includes(author);
      drawer.hidden = !(matchesText && matchesAuthor);
      if (!drawer.hidden) visible += 1;
    });
    if (visibleCount) visibleCount.textContent = String(visible);
    if (empty) empty.hidden = visible !== 0;
  }

  function applySort() {
    const mode = sort?.value || 'accession';
    const ordered = [...drawers].sort((a,b) => {
      if (mode === 'alpha') return a.dataset.term.localeCompare(b.dataset.term, ['ko','en']);
      if (mode === 'connections') return Number(b.dataset.count) - Number(a.dataset.count) || a.dataset.accession.localeCompare(b.dataset.accession);
      return a.dataset.accession.localeCompare(b.dataset.accession);
    });
    ordered.forEach((drawer) => grid.append(drawer));
  }

  drawers.forEach((drawer) => {
    drawer.addEventListener('click', () => {
      drawers.forEach((item) => item.classList.toggle('is-selected', item === drawer));
      const template = document.getElementById(drawer.dataset.template);
      if (!template) return;
      inspector.replaceChildren(template.content.cloneNode(true));
      if (window.matchMedia('(max-width: 820px)').matches) inspector.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  search?.addEventListener('input', applyView);
  sort?.addEventListener('change', () => { applySort(); applyView(); });
  authorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      author = button.dataset.keywordAuthor;
      authorButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      applyView();
    });
  });
  applySort();
  applyView();
})();
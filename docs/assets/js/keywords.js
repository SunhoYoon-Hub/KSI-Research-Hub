(() => {
  const grid = document.querySelector('[data-keyword-grid]');
  const inspector = document.querySelector('#keyword-inspector');
  if (!grid || !inspector) return;

  const drawers = Array.from(grid.querySelectorAll('[data-keyword-drawer]'));
  const languageButtons = Array.from(document.querySelectorAll('[data-keyword-language]'));
  const search = document.querySelector('[data-keyword-search]');
  const visibleCount = document.querySelector('[data-keyword-visible]');
  const totalCount = document.querySelector('[data-keyword-total]');
  const empty = document.querySelector('[data-keyword-empty]');
  const placeholder = inspector.innerHTML;
  let language = 'ko';
  let selectedDrawer = null;

  const renderSelection = (drawer, shouldScroll = false) => {
    const template = document.getElementById(drawer.dataset.template);
    if (!template) return;
    drawers.forEach((candidate) => candidate.classList.remove('is-selected'));
    drawer.classList.add('is-selected');
    selectedDrawer = drawer;
    inspector.replaceChildren(template.content.cloneNode(true));
    if (shouldScroll) inspector.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  const applyView = () => {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let shown = 0;
    let inLanguage = 0;

    drawers.forEach((drawer) => {
      const sameLanguage = drawer.dataset.language === language;
      const matchesSearch = !query || drawer.dataset.term.includes(query);
      if (sameLanguage) inLanguage += 1;
      drawer.hidden = !(sameLanguage && matchesSearch);
      if (!drawer.hidden) shown += 1;
    });

    if (visibleCount) visibleCount.textContent = String(shown);
    if (totalCount) totalCount.textContent = String(inLanguage);
    if (empty) empty.hidden = shown !== 0;
  };

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextLanguage = button.dataset.keywordLanguage;
      if (nextLanguage === language) return;

      const counterpart = selectedDrawer?.dataset.counterpart;
      const pairedDrawer = counterpart
        ? drawers.find((drawer) => drawer.dataset.accession === counterpart && drawer.dataset.language === nextLanguage)
        : null;

      language = nextLanguage;
      languageButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle('is-active', active);
        candidate.setAttribute('aria-pressed', String(active));
      });

      if (search) search.value = '';
      applyView();

      if (pairedDrawer) renderSelection(pairedDrawer);
    });
  });

  drawers.forEach((drawer) => {
    drawer.addEventListener('click', () => renderSelection(drawer, true));
  });

  search?.addEventListener('input', applyView);
  applyView();
})();

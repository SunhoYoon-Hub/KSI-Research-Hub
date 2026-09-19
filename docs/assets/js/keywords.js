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

  const clearSelection = () => {
    drawers.forEach((drawer) => drawer.classList.remove('is-selected'));
    inspector.innerHTML = placeholder;
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

    const selected = drawers.find((drawer) => drawer.classList.contains('is-selected'));
    if (selected?.hidden) clearSelection();
  };

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      language = button.dataset.keywordLanguage;
      languageButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle('is-active', active);
        candidate.setAttribute('aria-pressed', String(active));
      });
      if (search) search.value = '';
      clearSelection();
      applyView();
    });
  });

  drawers.forEach((drawer) => {
    drawer.addEventListener('click', () => {
      const template = document.getElementById(drawer.dataset.template);
      if (!template) return;
      drawers.forEach((candidate) => candidate.classList.remove('is-selected'));
      drawer.classList.add('is-selected');
      inspector.replaceChildren(template.content.cloneNode(true));
      inspector.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  });

  search?.addEventListener('input', applyView);
  applyView();
})();

(() => {
  const buttons = [...document.querySelectorAll('[data-project-filter]')];
  const cards = [...document.querySelectorAll('.project-card')];
  const count = document.querySelector('#visible-project-count');
  const empty = document.querySelector('#empty-state');

  if (!buttons.length || !cards.length) return;

  const applyFilter = (filter) => {
    let visible = 0;

    cards.forEach((card) => {
      const show = filter === 'all'
        || card.dataset.researcher === filter
        || card.dataset.stage === filter;

      card.hidden = !show;
      if (show) visible += 1;
    });

    buttons.forEach((button) => {
      const active = button.dataset.projectFilter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    count.textContent = String(visible);
    empty.hidden = visible !== 0;
  };

  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => applyFilter(button.dataset.projectFilter));
  });
})();

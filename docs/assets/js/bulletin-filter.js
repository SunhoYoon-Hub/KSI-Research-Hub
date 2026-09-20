(() => {
  const buttons = [...document.querySelectorAll("[data-bulletin-filter]")];
  const entries = [...document.querySelectorAll("[data-bulletin-group]")];

  if (!buttons.length || !entries.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.bulletinFilter;

      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      entries.forEach((entry) => {
        entry.hidden = filter !== "all" && entry.dataset.bulletinGroup !== filter;
      });
    });
  });
})();

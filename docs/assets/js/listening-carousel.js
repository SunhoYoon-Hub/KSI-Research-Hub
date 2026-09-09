(() => {
  const revealHashRecord = () => {
    if (!window.location.hash) return;
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target?.matches('details[data-listening-record]')) target.open = true;
  };

  revealHashRecord();
  window.addEventListener('hashchange', revealHashRecord);

  const recordList = document.querySelector('[data-listening-list]');
  const sortButtons = Array.from(document.querySelectorAll('[data-listening-sort]'));

  if (recordList && sortButtons.length) {
    const records = Array.from(recordList.querySelectorAll('[data-listening-record]'));
    const byRecordOrder = (a, b) => Number(a.dataset.recordOrder) - Number(b.dataset.recordOrder);
    const comparators = {
      record: byRecordOrder,
      published: (a, b) => b.dataset.publicationDate.localeCompare(a.dataset.publicationDate) || byRecordOrder(a, b),
      researcher: (a, b) => a.dataset.researcher.localeCompare(b.dataset.researcher, 'en') || byRecordOrder(a, b)
    };

    sortButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const comparator = comparators[button.dataset.listeningSort];
        if (!comparator) return;

        [...records].sort(comparator).forEach((record) => recordList.append(record));
        sortButtons.forEach((candidate) => {
          const isActive = candidate === button;
          candidate.classList.toggle('is-active', isActive);
          candidate.setAttribute('aria-pressed', String(isActive));
        });
      });
    });
  }

  const carousels = document.querySelectorAll('[data-listening-carousel]');

  carousels.forEach((carousel) => {
    const cards = Array.from(carousel.querySelectorAll('[data-album-card]'));
    const previous = carousel.querySelector('[data-carousel-previous]');
    const next = carousel.querySelector('[data-carousel-next]');
    const coverflow = carousel.querySelector('.coverflow');
    const jumpButtons = Array.from(carousel.querySelectorAll('[data-album-jump]'));
    const information = carousel.querySelector('[data-album-information]');
    const closeButton = carousel.querySelector('[data-record-close]');

    closeButton?.addEventListener('click', (event) => {
      event.preventDefault();
      carousel.open = false;
      carousel.querySelector('summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (!cards.length || !previous || !next || !coverflow || !information) return;

    const currentNumber = information.querySelector('[data-current-number]');
    const currentTitle = information.querySelector('[data-current-title]');
    const currentArtist = information.querySelector('[data-current-artist]');
    const currentMeta = information.querySelector('[data-current-meta]');
    const currentNote = information.querySelector('[data-current-note]');
    const noteContainer = information.querySelector('[data-album-note-copy]');
    const currentLink = information.querySelector('[data-current-link]');
    let activeIndex = Math.max(0, cards.findIndex((card) => card.classList.contains('is-active')));
    let pointerStart = null;

    const relativePosition = (index) => {
      let position = index - activeIndex;
      const half = Math.floor(cards.length / 2);
      if (position > half) position -= cards.length;
      if (position < -half) position += cards.length;
      return position;
    };

    const update = () => {
      cards.forEach((card, index) => {
        const position = relativePosition(index);
        const isActive = index === activeIndex;
        card.dataset.position = String(position);
        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-pressed', String(isActive));
        card.tabIndex = isActive ? 0 : -1;
      });

      jumpButtons.forEach((button, index) => {
        const isCurrent = index === activeIndex;
        button.classList.toggle('is-current', isCurrent);
        if (isCurrent) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });

      const active = cards[activeIndex];
      currentNumber.textContent = String(activeIndex + 1).padStart(2, '0');
      currentTitle.textContent = active.dataset.title;
      currentArtist.textContent = active.dataset.artist;
      currentMeta.textContent = active.dataset.meta;
      currentNote.textContent = active.dataset.note;
      noteContainer.hidden = !active.dataset.note;
      currentLink.href = active.dataset.url;
    };

    const select = (index) => {
      activeIndex = (index + cards.length) % cards.length;
      update();
    };

    previous.addEventListener('click', () => select(activeIndex - 1));
    next.addEventListener('click', () => select(activeIndex + 1));
    cards.forEach((card, index) => card.addEventListener('click', () => select(index)));
    jumpButtons.forEach((button, index) => button.addEventListener('click', () => select(index)));

    coverflow.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        select(activeIndex - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        select(activeIndex + 1);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        select(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        select(cards.length - 1);
      }
    });

    coverflow.addEventListener('pointerdown', (event) => {
      pointerStart = event.clientX;
    });

    coverflow.addEventListener('pointerup', (event) => {
      if (pointerStart === null) return;
      const distance = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(distance) < 45) return;
      select(activeIndex + (distance < 0 ? 1 : -1));
    });

    coverflow.addEventListener('pointercancel', () => {
      pointerStart = null;
    });

    carousel.classList.add('is-ready');
    update();
  });
})();

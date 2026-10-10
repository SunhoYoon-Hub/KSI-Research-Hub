(() => {
  'use strict';
  const element = document.querySelector('[data-visitor-counter]');
  if (!element || location.hostname !== 'sunhoyoon-hub.github.io' || !location.pathname.startsWith('/KSI-Research-Hub/')) return;
  const endpoint = element.dataset.endpoint;
  if (!endpoint) return;
  const prefix = 'ksi.visits.v1.';
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  function findStorage() {
    for (const name of ['localStorage', 'sessionStorage']) {
      try {
        const storage = window[name];
        storage.setItem(prefix + 'probe', '1');
        storage.removeItem(prefix + 'probe');
        return storage;
      } catch { /* If storage is blocked, only read the shared counts. */ }
    }
    return null;
  }
  async function request(method = 'GET', token) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(endpoint, {
        method, mode: 'cors', credentials: 'omit', cache: 'no-store',
        signal: controller.signal,
        ...(token ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) } : {}),
      });
      if (!response.ok) throw new Error('Counter unavailable');
      const counts = await response.json();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(counts.day) || !Number.isSafeInteger(counts.today) ||
          !Number.isSafeInteger(counts.total) || counts.today < 0 || counts.total < counts.today) throw new Error('Invalid counts');
      return counts;
    } finally { clearTimeout(timer); }
  }
  async function load() {
    try {
      let counts = await request(); // Server decides the Korean calendar day.
      const storage = findStorage();
      if (storage && storage.getItem(prefix + 'countedDay') !== counts.day) {
        const getToken = () => {
          let token = storage.getItem(prefix + 'browser');
          if (!uuid.test(token || '')) {
            token = crypto.randomUUID();
            storage.setItem(prefix + 'browser', token);
          }
          return token;
        };
        const token = navigator.locks
          ? await navigator.locks.request(prefix + 'browser', getToken)
          : getToken();
        counts = await request('POST', token);
        // A failed or timed-out POST is never acknowledged; server dedupes retries.
        try { storage.setItem(prefix + 'countedDay', counts.day); } catch { /* No effect on server deduplication. */ }
      }
      element.querySelector('[data-visits-today]').textContent = counts.today.toLocaleString('ko-KR');
      element.querySelector('[data-visits-total]').textContent = counts.total.toLocaleString('ko-KR');
      element.hidden = false;
    } catch { element.hidden = true; }
  }
  if (document.visibilityState === 'hidden') {
    const onVisible = () => {
      if (document.visibilityState !== 'hidden') {
        document.removeEventListener('visibilitychange', onVisible);
        load();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
  } else { load(); }
})();

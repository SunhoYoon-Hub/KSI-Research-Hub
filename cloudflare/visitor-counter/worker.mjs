// Cloudflare dashboard: replace Hello World with this whole file.
const SITE_ORIGIN = 'https://sunhoyoon-hub.github.io';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DAY_MS = 86400000;

export function koreanDay(now = Date.now()) {
  return new Date(now + 9 * 3600000).toISOString().slice(0, 10);
}

function reply(request, data, status = 200) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff',
  };
  if (request.headers.get('Origin') === SITE_ORIGIN) {
    headers['Access-Control-Allow-Origin'] = SITE_ORIGIN;
    headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return new Response(status === 204 ? null : JSON.stringify(data), { status, headers });
}

function countQuery(db, day) {
  return db.prepare(`SELECT
    COALESCE((SELECT visits FROM visit_days WHERE day = ?), 0) AS today,
    COALESCE((SELECT visits FROM visit_total WHERE id = 1), 0) AS total,
    (SELECT started_on FROM visit_total WHERE id = 1) AS startedOn`).bind(day);
}

export async function handleRequest(request, env, now = Date.now()) {
  const url = new URL(request.url);
  if (url.pathname !== '/' && url.pathname !== '/v1/visits') {
    return reply(request, { error: 'not_found' }, 404);
  }
  const origin = request.headers.get('Origin');
  if (origin && origin !== SITE_ORIGIN) return reply(request, { error: 'forbidden' }, 403);
  if (request.method === 'OPTIONS') {
    return reply(request, null, origin === SITE_ORIGIN ? 204 : 403);
  }
  if (request.method !== 'GET' && request.method !== 'POST') {
    return reply(request, { error: 'method_not_allowed' }, 405);
  }
  // Opening Visit or the editor's preview never adds a visit.
  if (request.method === 'POST' && (url.pathname !== '/v1/visits' || origin !== SITE_ORIGIN)) {
    return reply(request, { error: 'forbidden' }, 403);
  }
  const day = koreanDay(now);
  try {
    if (request.method === 'GET') {
      const counts = await countQuery(env.DB, day).first();
      return reply(request, { day, ...counts });
    }
    if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') {
      return reply(request, { error: 'invalid_request' }, 400);
    }
    // Bound actual body size, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return reply(request, { error: 'invalid_request' }, 400);
    const chunks = [];
    let length = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 512) {
        await reader.cancel();
        return reply(request, { error: 'invalid_request' }, 400);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    let token;
    try { token = JSON.parse(new TextDecoder().decode(bytes)).token; }
    catch { return reply(request, { error: 'invalid_request' }, 400); }
    if (typeof token !== 'string' || !UUID.test(token)) {
      return reply(request, { error: 'invalid_token' }, 400);
    }
    // Never store the browser's raw marker; the digest changes each Korean day.
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${day}:${token.toLowerCase()}`));
    const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    const cutoff = koreanDay(now - 2 * DAY_MS);
    const result = await env.DB.batch([
      env.DB.prepare('DELETE FROM visit_tokens WHERE day < ?').bind(cutoff),
      env.DB.prepare('INSERT OR IGNORE INTO visit_tokens (day, token_hash) VALUES (?, ?)').bind(day, hash),
      countQuery(env.DB, day),
    ]);
    return reply(request, { day, ...result[2].results[0] });
  } catch {
    // Avoid logging request bodies, browser markers, or database errors.
    return reply(request, { error: 'unavailable' }, 503);
  }
}

export default {
  fetch(request, env) { return handleRequest(request, env); },
};

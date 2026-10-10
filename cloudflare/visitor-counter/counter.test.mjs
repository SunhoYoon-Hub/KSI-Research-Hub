import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import vm from 'node:vm';
import worker, { handleRequest, koreanDay } from './worker.mjs';

const origin = 'https://sunhoyoon-hub.github.io';
const endpoint = 'https://counter.example/v1/visits';
const token = 'd4c34644-34b2-4c18-af95-8b617367519a';
const noon = Date.parse('2026-10-10T03:00:00Z');
const schema = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8');

// Run the production SQL against SQLite, with D1's transactional batch interface.
class LocalD1 {
  constructor(path = ':memory:') { this.sql = new DatabaseSync(path); this.sql.exec(schema); }
  prepare(sql) {
    const db = this.sql;
    const prepared = (values = []) => ({
      sql, values,
      bind: (...next) => prepared(next),
      first: async () => db.prepare(sql).get(...values) || null,
    });
    return prepared();
  }
  async batch(statements) {
    this.sql.exec('BEGIN IMMEDIATE');
    try {
      const results = statements.map(s => {
        const query = this.sql.prepare(s.sql);
        if (/^\s*SELECT/i.test(s.sql)) return { results: query.all(...s.values), success: true };
        query.run(...s.values);
        return { results: [], success: true };
      });
      this.sql.exec('COMMIT');
      return results;
    } catch (error) { this.sql.exec('ROLLBACK'); throw error; }
  }
}
function visit(marker = token, extra = {}) {
  return new Request(endpoint, {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...extra },
    body: JSON.stringify({ token: marker }),
  });
}
const read = db => handleRequest(new Request(endpoint), { DB: db }, noon);

test('GET reads zero without registering; repeated/parallel POST counts once', async () => {
  const db = new LocalD1();
  assert.deepEqual(await (await read(db)).json(), { day: '2026-10-10', today: 0, total: 0, startedOn: null });
  const responses = await Promise.all(Array.from({ length: 25 }, () => handleRequest(visit(), { DB: db }, noon)));
  for (const response of responses) assert.equal(response.status, 200);
  assert.equal((await (await read(db)).json()).total, 1);
  assert.equal((await handleRequest(visit(token.toUpperCase()), { DB: db }, noon)).status, 200);
  assert.equal((await (await read(db)).json()).total, 1);
  assert.equal(db.sql.prepare('SELECT token_hash FROM visit_tokens').get().token_hash.length, 64);
  assert.equal(db.sql.prepare('SELECT token_hash FROM visit_tokens').get().token_hash.includes(token), false);
  db.sql.close();
});

test('different browsers add visits; Korea midnight resets today and retains total', async () => {
  const db = new LocalD1();
  const before = Date.parse('2026-10-10T14:59:59.999Z');
  const after = Date.parse('2026-10-10T15:00:00.000Z');
  assert.equal(koreanDay(before), '2026-10-10');
  assert.equal(koreanDay(after), '2026-10-11');
  await handleRequest(visit(), { DB: db }, before);
  await handleRequest(visit('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee'), { DB: db }, before);
  const empty = await (await handleRequest(new Request(endpoint), { DB: db }, after)).json();
  assert.deepEqual([empty.today, empty.total], [0, 2]);
  const next = await (await handleRequest(visit(), { DB: db }, after)).json();
  assert.deepEqual([next.today, next.total], [1, 3]);
  assert.equal(next.startedOn, '2026-10-10');
  const hashes = db.sql.prepare('SELECT token_hash FROM visit_tokens ORDER BY day').all();
  assert.notEqual(hashes[0].token_hash, hashes[2].token_hash);
  db.sql.close();
});

test('expiry removes old markers without reducing durable counts; schema rerun and reopen preserve total', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'ksi-counter-'));
  const path = join(dir, 'test.sqlite');
  try {
    const db = new LocalD1(path);
    for (let i = 0; i < 5; i++) await handleRequest(visit(), { DB: db }, noon + i * 86400000);
    assert.equal(db.sql.prepare('SELECT COUNT(*) AS n FROM visit_tokens').get().n, 3);
    db.sql.exec(schema);
    assert.equal(db.sql.prepare('SELECT visits FROM visit_total').get().visits, 5);
    db.sql.close();
    const reopened = new LocalD1(path);
    assert.equal((await (await read(reopened)).json()).total, 5);
    reopened.sql.close();
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('rejected requests never register; missing DB returns 503; default fetch ignores execution context', async () => {
  const db = new LocalD1();
  assert.equal((await handleRequest(visit(token, { Origin: 'https://evil.example' }), { DB: db }, noon)).status, 403);
  assert.equal((await handleRequest(visit('bad'), { DB: db }, noon)).status, 400);
  assert.equal((await handleRequest(new Request(endpoint, { method: 'POST', body: '{' }), { DB: db }, noon)).status, 403);
  assert.equal((await handleRequest(new Request(endpoint, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: '{' }), { DB: db }, noon)).status, 400);
  assert.equal((await handleRequest(new Request(endpoint, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: 'x'.repeat(600) }), { DB: db }, noon)).status, 400);
  assert.equal((await handleRequest(visit(), {}, noon)).status, 503);
  assert.equal((await worker.fetch(new Request(endpoint), { DB: db }, { waitUntil() {} })).status, 200);
  const preflight = await handleRequest(new Request(endpoint, { method: 'OPTIONS', headers: { Origin: origin } }), { DB: db }, noon);
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('Access-Control-Allow-Origin'), origin);
  assert.equal((await (await read(db)).json()).total, 0);
  db.sql.close();
});

test('batch failure rolls back the insert and both counters', async () => {
  const db = new LocalD1();
  const batch = db.batch.bind(db);
  db.batch = statements => batch([...statements, db.prepare('SELECT * FROM nonexistent')]);
  assert.equal((await handleRequest(visit(), { DB: db }, noon)).status, 503);
  assert.equal(db.sql.prepare('SELECT COUNT(*) AS n FROM visit_tokens').get().n, 0);
  assert.equal((await (await read(db)).json()).total, 0);
  db.sql.close();
});

const clientCode = readFileSync(new URL('../../docs/assets/js/visitor-counter.js', import.meta.url), 'utf8');
async function client(db, saved, { now = noon, blocked = false, fail = false, losePost = false } = {}) {
  let resolve;
  const done = new Promise(r => { resolve = r; });
  const today = {}, total = {};
  const element = {
    dataset: { endpoint },
    querySelector: selector => selector.includes('today') ? today : total,
    set hidden(value) { this.isHidden = value; resolve(); },
  };
  const storage = {
    getItem: k => saved.get(k) ?? null,
    setItem: (k, v) => { if (blocked) throw new Error('blocked'); saved.set(k, v); },
    removeItem: k => saved.delete(k),
  };
  const methods = [];
  const context = {
    document: { querySelector: () => element, visibilityState: 'visible' },
    location: { hostname: 'sunhoyoon-hub.github.io', pathname: '/KSI-Research-Hub/' },
    window: { localStorage: storage, sessionStorage: storage },
    navigator: {}, crypto, AbortController, setTimeout, clearTimeout,
    fetch: async (url, opts) => {
      methods.push(opts.method);
      if (fail) throw new Error('offline');
      const request = new Request(url, { ...opts, headers: { Origin: origin, ...opts.headers } });
      const response = await handleRequest(request, { DB: db }, now);
      if (losePost && opts.method === 'POST') throw new Error('Response lost after commit');
      return response;
    },
  };
  vm.runInNewContext(clientCode, context);
  await done;
  return { methods, hidden: element.isHidden, today: today.textContent, total: total.textContent };
}

test('client refresh/page move only reads; lost POST response retry dedupes; failures hide', async () => {
  const db = new LocalD1();
  const saved = new Map();
  assert.deepEqual((await client(db, saved, { losePost: true })).methods, ['GET', 'POST']);
  const retry = await client(db, saved);
  assert.deepEqual(retry.methods, ['GET', 'POST']);
  assert.equal(retry.total, '1');
  const refresh = await client(db, saved);
  assert.deepEqual(refresh.methods, ['GET']);
  assert.equal(refresh.hidden, false);
  const next = await client(db, saved, { now: noon + 86400000 });
  assert.deepEqual([next.today, next.total], ['1', '2']);
  assert.equal((await client(db, saved, { fail: true })).hidden, true);
  const noStorage = await client(db, new Map(), { blocked: true });
  assert.deepEqual(noStorage.methods, ['GET']);
  assert.equal(noStorage.total, '2');
  db.sql.close();
});

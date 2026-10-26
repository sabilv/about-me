// Cloudflare Pages Function: stores the site JSON in KV.
// GET is public (the site reads it). PUT / POST / DELETE need the admin key.
import { validateSite } from '../../src/site.js'

const MAX_BYTES = 200_000
const MAX_TRIES = 5 // wrong keys allowed per IP...
const LOCK_SECONDS = 900 // ...before a 15 minute lock

const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 
      'content-type': 'application/json; charset=utf-8', 
      'x-content-type-options': 'nosniff', 
      ...extra 
    },
  })

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Compares every character, so timing does not reveal how much matched.
function safeEqual(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function authorize(request, env) {
  if (!env.SITE_KV || !env.ADMIN_KEY_HASH) return { error: json({ error: 'Admin is not configured on the server.' }, 503) }
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const lockKey = `rl:${ip}`
  const tries = parseInt((await env.SITE_KV.get(lockKey)) || '0', 10)
  if (tries >= MAX_TRIES) return { error: json({ error: 'Too many attempts. Try again in 15 minutes.' }, 429, { 'retry-after': String(LOCK_SECONDS) }) }

  const key = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  const ok = key.length >= 32 && safeEqual(await sha256Hex(key), env.ADMIN_KEY_HASH.trim().toLowerCase())
  if (!ok) {
    await env.SITE_KV.put(lockKey, String(tries + 1), { expirationTtl: LOCK_SECONDS })
    return { error: json({ error: 'Unauthorized.' }, 401) }
  }
  if (tries) await env.SITE_KV.delete(lockKey)
  return { ok: true }
}

async function backupCurrent(env) {
  const current = await env.SITE_KV.get('site')
  if (current) await env.SITE_KV.put('site:prev', current)
  return current
}

export async function onRequestGet({ env }) {
  if (!env.SITE_KV) return json({ site: null })
  const raw = await env.SITE_KV.get('site')
  return json(
    { site: raw ? JSON.parse(raw) : null }, 
    200, 
    { 'cache-control': 'no-cache, must-revalidate, max-age=0' }
  )
}

export async function onRequestPut({ request, env }) {
  const gate = await authorize(request, env)
  if (gate.error) return gate.error
  const text = await request.text()
  if (text.length > MAX_BYTES) return json({ error: 'Payload too large (max 200 KB).' }, 413)
  let site
  try { site = JSON.parse(text) } catch { return json({ error: 'That is not valid JSON.' }, 400) }
  const details = validateSite(site)
  if (details.length) return json({ error: 'Validation failed.', details }, 422)
  await backupCurrent(env)
  await env.SITE_KV.put('site', JSON.stringify(site))
  return json({ ok: true })
}

// POST { action: 'check' | 'restore' }
export async function onRequestPost({ request, env }) {
  const gate = await authorize(request, env)
  if (gate.error) return gate.error
  const body = await request.json().catch(() => ({}))
  if (body.action === 'check') return json({ ok: true })
  if (body.action === 'restore') {
    const prev = await env.SITE_KV.get('site:prev')
    if (!prev) return json({ error: 'There is no previous version to restore.' }, 404)
    await backupCurrent(env)
    await env.SITE_KV.put('site', prev)
    return json({ ok: true })
  }
  return json({ error: 'Unknown action.' }, 400)
}

// Reset to the built-in defaults (the previous version is kept for restore).
export async function onRequestDelete({ request, env }) {
  const gate = await authorize(request, env)
  if (gate.error) return gate.error
  await backupCurrent(env)
  await env.SITE_KV.delete('site')
  return json({ ok: true })
}
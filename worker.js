// Cloudflare Worker entry (for a Worker with static assets, like your "me" project).
// Only /api/content runs this code; every other request is served by the static assets directly.
import * as api from './functions/api/content.js'

const handlers = { GET: api.onRequestGet, PUT: api.onRequestPut, POST: api.onRequestPost, DELETE: api.onRequestDelete }

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    
    // 1. Tangani endpoint API
    if (pathname === '/api/content') {
      const handler = handlers[request.method]
      if (!handler) return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, PUT, POST, DELETE' } })
      return handler({ request, env })
    }

    // 2. Ambil aset statis
    let response = await env.ASSETS.fetch(request)

    // 3. Fallback SPA: Jika aset statis 404 (route client-side), sajikan index.html
    if (response.status === 404 && !pathname.startsWith('/api/')) {
      const indexRequest = new Request(new URL('/index.html', request.url), request)
      response = await env.ASSETS.fetch(indexRequest)
    }

    return response
  },
}
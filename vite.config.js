import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Emits robots.txt and sitemap.xml on build using VITE_SITE_URL from .env
const seoFiles = (site) => ({
  name: 'seo-files',
  generateBundle() {
    const day = new Date().toISOString().slice(0, 10)
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n` })
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site}/</loc><lastmod>${day}</lastmod><priority>1.0</priority></url>\n</urlset>\n`,
    })
  },
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const site = (env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')
  return { plugins: [react(), seoFiles(site)] }
})

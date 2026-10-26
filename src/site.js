// Shared by the public site, the admin page and the Cloudflare function.
export const SITE_KEYS = ['person', 'skillGroups', 'socials', 'recommendations', 'content']
const LANGS = ['en', 'id']
const SAFE_URL = /^(https?:\/\/|mailto:)/i
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
const isStr = (v) => typeof v === 'string'
const strList = (v) => Array.isArray(v) && v.every(isStr)
const listOf = (v, check) => Array.isArray(v) && v.every((x) => isObj(x) && check(x))
const strs = (o, keys) => keys.every((k) => isStr(o?.[k]))

export function validateSite(site) {
  const e = []
  const need = (ok, msg) => { if (!ok) e.push(msg) }
  if (!isObj(site)) return ['Root must be a JSON object.']
  for (const k of Object.keys(site)) need(SITE_KEYS.includes(k), `Unknown top-level key: ${k}`)
  for (const k of SITE_KEYS) need(k in site, `Missing top-level key: ${k}`)
  if (e.length) return e

  const p = site.person
  need(isObj(p) && strs(p, ['name', 'pronouns', 'title']), 'person needs name, pronouns and title (text).')
  for (const k of ['linkedin', 'github']) {
    need(!isObj(p) || (isStr(p[k]) && SAFE_URL.test(p[k])), `person.${k} must start with https://, http:// or mailto:`)
  }
  need(listOf(site.skillGroups, (g) => strs(g, ['en', 'id']) && strList(g.items) && (g.itemsId === undefined || strList(g.itemsId))),
    'skillGroups: each group needs en, id and items (a list of text).')
  need(listOf(site.socials, (s) => ['LinkedIn', 'GitHub', 'Email'].includes(s.name) && isStr(s.url) && (s.url === '' || SAFE_URL.test(s.url))),
    'socials: name must be LinkedIn, GitHub or Email; url empty or starting with https:// or mailto:')
  need(listOf(site.recommendations, (r) => strs(r, ['quote', 'name', 'role'])), 'recommendations: each needs quote, name and role.')

  const c = site.content
  need(isObj(c), 'content must be an object with en and id.')
  if (isObj(c)) {
    for (const l of LANGS) {
      const t = c[l]
      const w = `content.${l}`
      if (!isObj(t)) { e.push(`${w} is missing.`); continue }
      need(isObj(t.meta) && strs(t.meta, ['title', 'description']), `${w}.meta needs title and description.`)
      const ui = t.ui
      need(isObj(ui) && strs(ui, ['lead', 'getInTouch', 'seeExperience', 'goodFit', 'discuss', 'contactTitle', 'contactText', 'linkedin', 'github', 'theme', 'auto', 'light', 'dark', 'language', 'social', 'main'])
        && isObj(ui.nav) && strs(ui.nav, ['about', 'experience', 'services', 'together', 'contact'])
        && isObj(ui.titles) && strs(ui.titles, ['about', 'experience', 'services', 'together', 'kind']), `${w}.ui is incomplete.`)
      need(strList(t.about), `${w}.about must be a list of text.`)
      need(listOf(t.facts, (f) => strs(f, ['kicker', 'title', 'text'])), `${w}.facts: each needs kicker, title and text.`)
      need(listOf(t.services, (s) => strs(s, ['title', 'text'])), `${w}.services: each needs title and text.`)
      need(listOf(t.ways, (s) => strs(s, ['title', 'text', 'fit'])), `${w}.ways: each needs title, text and fit.`)
      need(listOf(t.experience, (x) => strs(x, ['role', 'company', 'period', 'place', 'summary']) && strList(x.points)
        && (x.highlights === undefined || listOf(x.highlights, (h) => strs(h, ['value', 'label'])))),
        `${w}.experience: each needs role, company, period, place, summary and points (highlights optional).`)
    }
  }
  return e
}

// Saved JSON is a full site object; this keeps the site safe if a language is partly missing.
export function mergeSite(defaults, override) {
  if (!override) return defaults
  return {
    ...defaults,
    ...override,
    content: {
      en: { ...defaults.content.en, ...override.content?.en },
      id: { ...defaults.content.id, ...override.content?.id },
    },
  }
}

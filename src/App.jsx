import { useEffect, useState } from 'react'
import { defaultSite } from './data.js'
import { mergeSite, validateSite } from './site.js'
import { applyTheme, initialLang, initialTheme, showThemeToggle, write } from './prefs.js'

const icons = {
  LinkedIn: <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />,
  GitHub: <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />,
  Email: <path d="M3 5h18v14H3zM3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
}

const themeIcons = {
  auto: <><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor" /></>,
  light: <><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  dark: <path d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.5a6.5 6.5 0 0 0 10 10z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
}
const nextTheme = { auto: 'light', light: 'dark', dark: 'auto' }

const Section = ({ id, title, children }) => (
  <section id={id} className="section">
    <h2 className="section-title">{title}</h2>
    <div className="section-body">{children}</div>
  </section>
)

export default function App() {
  const [site, setSite] = useState(defaultSite)
  const { person = {}, skillGroups = [], socials = [], recommendations = [], content = {} } = site
  const [lang, setLang] = useState(initialLang)
  const [theme, setTheme] = useState(initialTheme)

  const t = content[lang] || defaultSite.content[lang] || {}
  const u = t.ui || {}

  // Fetch updated content from KV, bypassing HTTP cache
  useEffect(() => {
    const ctrl = new AbortController()
    fetch('/api/content', { signal: ctrl.signal, cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.site && validateSite(d.site).length === 0) setSite(mergeSite(defaultSite, d.site)) })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  useEffect(() => {
    write('lang', lang)
    document.documentElement.lang = lang
    if (t.meta?.title) document.title = t.meta.title
    const set = (sel, v) => v && document.querySelector(sel)?.setAttribute('content', v)
    set('meta[name="description"]', t.meta?.description)
    set('meta[property="og:title"]', t.meta?.title)
    set('meta[property="og:description"]', t.meta?.description)
    set('meta[name="twitter:title"]', t.meta?.title)
    set('meta[name="twitter:description"]', t.meta?.description)
  }, [lang, t])

  useEffect(() => {
    if (showThemeToggle) write('theme', theme)
    applyTheme(theme)
  }, [theme])

  return (
    <>
      <header className="nav">
        <a href="#top" className="brand">{person.name}</a>
        <nav aria-label={u.main}>
          <a href="#about">{u.nav?.about}</a>
          <a href="#experience">{u.nav?.experience}</a>
          <a href="#services">{u.nav?.services}</a>
          <a href="#work-together">{u.nav?.together}</a>
          <a className="btn small" href="#contact">{u.nav?.contact}</a>
        </nav>
        <div className="tools">
          <div className="lang" role="group" aria-label={u.language}>
            {['en', 'id'].map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} lang={l}>{l.toUpperCase()}</button>
            ))}
          </div>
          {showThemeToggle && (
            <button type="button" className="tool" onClick={() => setTheme(nextTheme[theme])} aria-label={`${u.theme}: ${u[theme]}`} title={`${u.theme}: ${u[theme]}`}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">{themeIcons[theme]}</svg>
              <span>{u[theme]}</span>
            </button>
          )}
        </div>
      </header>

      <main id="top">
        <div className="hero">
          <p className="meta">{person.pronouns} · Jakarta, Indonesia</p>
          <h1 className="name">
  {person.name.split(' ').map((part, i) => (
    <span key={i}>
      {part}
      {i < person.name.split(' ').length - 1 && <br />}
    </span>
  ))}
</h1>
          <p className="lead">{u.lead}</p>
          <div className="hero-actions">
            <a className="btn" href="#contact">{u.getInTouch}</a>
            <a className="btn ghost" href="#experience">{u.seeExperience}</a>
          </div>
        </div>

        <ul className="stats">
          {(t.facts || []).map((f) => (
            <li key={f.kicker}><small>{f.kicker}</small><strong>{f.title}</strong><span>{f.text}</span></li>
          ))}
        </ul>

        <Section id="about" title={u.titles?.about}>
          {(t.about || []).map((p) => <p key={p.slice(0, 20)} className="prose">{p}</p>)}
          <div className="skill-groups">
            {(skillGroups || []).map((g) => (
              <div key={g.en}>
                <h3>{g[lang]}</h3>
                <ul className="chips">{(((lang === 'id' && g.itemsId) || g.items) || []).map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title={u.titles?.experience}>
          <div className="cases">
            {(t.experience || []).map((e, i) => (
              <details key={e.company + e.period} className="case" open={i === 0}>
                <summary>
                  <span className="case-period">{e.period}</span>
                  <span className="case-main">
                    <span className="case-role">{e.role}</span>
                    <span className="case-co">{e.company} · {e.place}</span>
                  </span>
                </summary>
                <p className="case-sum">{e.summary}</p>
                {e.highlights && (
                  <div className="highlights">
                    {(e.highlights || []).map((h) => (
                      <div key={h.label}><strong>{h.value}</strong><span>{h.label}</span></div>
                    ))}
                  </div>
                )}
                <ul>{(e.points || []).map((p) => <li key={p}>{p}</li>)}</ul>
              </details>
            ))}
          </div>
        </Section>

        <Section id="services" title={u.titles?.services}>
          <div className="grid2">
            {(t.services || []).map((s) => (
              <article key={s.title} className="service">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="work-together" title={u.titles?.together}>
          <div className="grid3">
            {(t.ways || []).map((w) => (
              <article key={w.title} className="way">
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <p className="fit">{u.goodFit} {w.fit}</p>
                <a className="btn small ghost" href="#contact">{u.discuss}</a>
              </article>
            ))}
          </div>
        </Section>

        {(recommendations || []).length > 0 && (
          <Section id="kind-words" title={u.titles?.kind}>
            <div className="grid2">
              {recommendations.map((r) => (
                <blockquote key={r.name} className="quote">
                  <p>{r.quote}</p>
                  <footer>{r.name}, {r.role}</footer>
                </blockquote>
              ))}
            </div>
          </Section>
        )}

        <section id="contact" className="contact">
          <h2>{u.contactTitle}</h2>
          <p>{u.contactText}</p>
          <div className="contact-actions">
            <a className="btn" href={person.linkedin} target="_blank" rel="noreferrer">{u.linkedin}</a>
            <a className="btn ghost" href={person.github} target="_blank" rel="noreferrer">{u.github}</a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} {person.name}</p>
        <ul className="social" aria-label={u.social}>
          {(socials || []).filter((x) => x.url).map((x) => (
            <li key={x.name}>
              <a href={x.url} target={x.url?.startsWith('mailto:') ? undefined : '_blank'} rel="me noopener noreferrer" aria-label={x.name}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">{icons[x.name]}</svg>
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  )
}
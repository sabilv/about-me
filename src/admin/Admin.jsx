import { useCallback, useEffect, useState } from 'react'
import { defaultSite } from '../data.js'
import { mergeSite, validateSite } from '../site.js'
import './admin.css'

// Target SHA-256 hash
const SECRET_URL_HASH = '4e0df186f8742845c478dfc5a083aaec6ba8e63b6bb31df4649733075b2cae89'
const DRAFT_STORAGE_KEY = 'admin_site_json_draft'

const call = (key, method, body) =>
  fetch('/api/content', {
    method,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body,
  })

const pretty = (site) => JSON.stringify(site, null, 2)

export default function Admin() {
  const [passInput, setPassInput] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  const [key, setKey] = useState('')
  const [text, setText] = useState(pretty(defaultSite))
  const [lastSaved, setLastSaved] = useState(pretty(defaultSite))
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  const isDirty = text !== lastSaved

  // Auto-dismiss notification toast setelah 5 detik
  useEffect(() => {
    if (!msg) return
    const timer = setTimeout(() => {
      setMsg(null)
    }, 5000)

    return () => clearTimeout(timer)
  }, [msg])

  // 1. Pengecekan awal & pembersihan parameter URL jika ada ?pass=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userHash = (params.get('pass') || '').trim().toLowerCase()

    if (userHash) {
      if (userHash === SECRET_URL_HASH) {
        setIsAuthorized(true)
        document.title = 'Site Admin'
        document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, nofollow')
      } else {
        window.location.replace('/')
      }
      window.history.replaceState({}, document.title, window.location.pathname)
    }
    setAuthChecked(true)
  }, [])

  // 2. Proteksi menutup tab saat ada perubahan belum tersimpan
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  // 3. Load konten dari server / draf localStorage
  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/content', { cache: 'no-store' })
      const d = await r.json()
      const formatted = pretty(mergeSite(defaultSite, d.site))

      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (savedDraft && savedDraft !== formatted) {
        setText(savedDraft)
        setMsg({ type: 'ok', text: '[SYSTEM] Loaded unsaved draft matrix from local storage.' })
      } else {
        setText(formatted)
        localStorage.removeItem(DRAFT_STORAGE_KEY)
        setMsg({ type: 'ok', text: d.site ? '[SYSTEM] Holocron node sync complete.' : '[SYSTEM] Default blueprint loaded.' })
      }

      setLastSaved(formatted)
    } catch {
      setMsg({ type: 'error', text: '[WARN] Offline mode: Server link unreachable. Active default Holocron.' })
    }
  }, [])

  useEffect(() => {
    if (isAuthorized) load()
  }, [isAuthorized, load])

  // Validasi string hash dari form
  const handlePassSubmit = (e) => {
    e.preventDefault()
    const inputHash = passInput.trim().toLowerCase()

    if (inputHash === SECRET_URL_HASH) {
      setIsAuthorized(true)
      document.title = 'Site Admin'
      document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, nofollow')
    } else {
      window.location.replace('/')
    }
  }

  const handleTextChange = (e) => {
    const val = e.target.value
    setText(val)
    if (val !== lastSaved) {
      localStorage.setItem(DRAFT_STORAGE_KEY, val)
    } else {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
    }
  }

  if (!authChecked) return null

  // Render Gatekeeper Terminal dengan Efek Bintang
  if (!isAuthorized) {
    return (
      <main className="imperial-terminal-wrapper">
        <div className="starfield"></div>
        <div className="starfield-twinkle"></div>

        <div className="imperial-card">
          <div className="imperial-header-title">
            IMPERIAL SECURITY TERMINAL v2.6
          </div>

          <form onSubmit={handlePassSubmit} className="imperial-form">
            <label htmlFor="passcode" className="imperial-label">
              State your security clearance, TK-421
            </label>

            <input
              id="passcode"
              type="password"
              autoFocus
              spellCheck="false"
              placeholder="Enter code clearance hash..."
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              className="imperial-input"
            />

            <button type="submit" className="imperial-btn">
              AUTHENTICATE CLEARANCE
            </button>
          </form>
        </div>
      </main>
    )
  }

  const send = async (method, body, done, reload) => {
    setBusy(true)
    setMsg(null)
    try {
      const r = await call(key, method, body)
      const d = await r.json().catch(() => ({}))
      if (!r.ok) {
        setMsg({ type: 'error', text: [d.error || `Error ${r.status}`, ...(d.details || [])].join('\n') })
      } else {
        setMsg({ type: 'ok', text: done })
        if (method === 'PUT' || method === 'DELETE') {
          setLastSaved(text)
          localStorage.removeItem(DRAFT_STORAGE_KEY)
        }
        if (reload) {
          localStorage.removeItem(DRAFT_STORAGE_KEY)
          await load()
        }
      }
    } catch {
      setMsg({ type: 'error', text: '[ERROR] Hyperdrive malfunction: Network failure.' })
    } finally {
      setBusy(false)
    }
  }

  const validate = () => {
    try {
      const errs = validateSite(JSON.parse(text))
      setMsg(errs.length ? { type: 'error', text: errs.join('\n') } : { type: 'ok', text: '[SUCCESS] JSON syntax clean. No corrupted blocks.' })
      return errs.length === 0
    } catch (e) {
      setMsg({ type: 'error', text: `[CRITICAL] Malformed JSON: ${e.message}` })
      return false
    }
  }

  const format = () => {
    try {
      const formatted = pretty(JSON.parse(text))
      setText(formatted)
      if (formatted !== lastSaved) {
        localStorage.setItem(DRAFT_STORAGE_KEY, formatted)
      }
    } catch (e) {
      setMsg({ type: 'error', text: `[CRITICAL] Malformed JSON: ${e.message}` })
    }
  }

  const save = () => validate() && send('PUT', text, '[SUCCESS] Mainframe updated successfully.')

  const download = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }))
    a.download = `holocron-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      if (!needKey) save()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const updated = text.substring(0, start) + '  ' + text.substring(end)
      setText(updated)
      localStorage.setItem(DRAFT_STORAGE_KEY, updated)
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2
      }, 0)
    }
  }

  const needKey = !key || busy

  return (
    <main className="admin">
      <div className="starfield"></div>
      <div className="starfield-twinkle"></div>

      {msg && (
        <div className={`admin-msg ${msg.type}`} role="status">
          <pre>{msg.text}</pre>
          <button type="button" className="admin-msg-close" onClick={() => setMsg(null)}>✕</button>
        </div>
      )}

      <header className="admin-header">
        <h1>/// IMPERIAL COMMAND CENTER ///</h1>
        {isDirty && <span className="admin-badge warning">[UNSAVED CIPHERS]</span>}
      </header>
      <p className="admin-note">Modify site JSON matrix. Press Ctrl+S (Cmd+S) or execute Commit to Sync.</p>

      <label className="admin-label" htmlFor="key">COMMAND CLEARANCE KEY</label>
      <div className="admin-row">
        <input
          id="key"
          type="password"
          autoComplete="off"
          spellCheck="false"
          value={key}
          onChange={(e) => setKey(e.target.value.trim())}
          placeholder="Paste Beskar Admin Key..."
        />
        <button type="button" disabled={needKey} onClick={() => send('POST', JSON.stringify({ action: 'check' }), '[AUTHORIZED] Beskar Key Accepted.')}>
          VERIFY KEY
        </button>
        <button type="button" onClick={() => setKey('')} disabled={!key}>
          PURGE KEY
        </button>
      </div>

      <div className="admin-label-row">
        <label className="admin-label" htmlFor="json">HOLOCRON DATA MATRIX</label>
        <span className="admin-char-count">{text.length} CHARS</span>
      </div>

      <textarea
        id="json"
        spellCheck="false"
        value={text}
        onKeyDown={handleKeyDown}
        onChange={handleTextChange}
        rows={28}
      />

      <div className="admin-row">
        <button type="button" onClick={format}>PRETTIFY MATRIX</button>
        <button type="button" onClick={validate}>SCAN INTEGRITY</button>
        <button type="button" className="primary" disabled={needKey} onClick={save}>
          COMMIT TO MAINFRAME
        </button>
        <button type="button" onClick={download}>EXTRACT BACKUP</button>
        <button type="button" onClick={() => { localStorage.removeItem(DRAFT_STORAGE_KEY); load(); }}>RE-SYNC HOLOCRON</button>
      </div>

      <div className="admin-row secondary-actions">
        <button type="button" disabled={needKey} onClick={() => send('POST', JSON.stringify({ action: 'restore' }), '[SUCCESS] Rolled back to prior Holocron snapshot.', true)}>
          ROLLBACK SNAPSHOT
        </button>
        <button type="button" className="danger" disabled={needKey} onClick={() => window.confirm('Purge all custom nodes and revert to factory defaults?') && send('DELETE', undefined, '[WARNING] Factory reset complete.', true)}>
          PURGE TO DEFAULTS
        </button>
      </div>
    </main>
  )
}
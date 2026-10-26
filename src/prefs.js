// Small helpers for remembering the visitor's language and theme choice.
export const read = (key, fallback) => {
  try { return localStorage.getItem(key) || fallback } catch { return fallback }
}
export const write = (key, value) => {
  try { localStorage.setItem(key, value) } catch { /* storage may be blocked */ }
}
// Set to true to show the Auto / Light / Dark button in the header again.
export const showThemeToggle = false

export const initialTheme = () => {
  if (!showThemeToggle) return 'auto' // follow the system setting
  const v = read('theme', 'auto')
  return ['auto', 'light', 'dark'].includes(v) ? v : 'auto'
}
export const initialLang = () => {
  const v = read('lang', '')
  if (v === 'en' || v === 'id') return v
  return (navigator.language || 'en').toLowerCase().startsWith('id') ? 'id' : 'en'
}
// "auto" removes the attribute so the system setting (prefers-color-scheme) decides.
export const applyTheme = (theme) => {
  const root = document.documentElement
  if (theme === 'auto') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme)
}

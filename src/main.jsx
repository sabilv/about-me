import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { installEasterEggs } from './easter.js'
import { applyTheme, initialTheme } from './prefs.js'
import './styles.css'

applyTheme(initialTheme())
const root = createRoot(document.getElementById('root'))

// Normalize path: trim outer slashes and normalize casing
const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '')

if (path === 'manage-sabil-x82k9') {
  import('./admin/Admin.jsx').then(({ default: Admin }) => root.render(<Admin />))
} else {
  root.render(<App />)
  installEasterEggs()
}
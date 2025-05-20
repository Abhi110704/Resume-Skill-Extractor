import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      className="theme-toggle"
      aria-label="Toggle dark/light mode"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
    </button>
  )
}
import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'sopa4all-theme' // el mismo que usa el script de index.html

/** Si el usuario eligió un tema antes, se respeta; si no, se usa el del sistema operativo. */
function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage puede estar bloqueado (modo privado): seguimos con el del sistema.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Sincroniza el estado de React con la clase "dark" de <html>, que es lo que lee el CSS.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sin almacenamiento el tema funciona igual, solo no se recuerda.
    }
  }, [theme])

  return { theme, toggleTheme }
}

import type { Theme } from '../hooks/useTheme'
import { SITE } from '../siteConfig'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <Logo className="size-9" />
          <div>
            <h1 className="text-xl leading-tight font-bold tracking-tight">
              Sopa<span className="text-brand">4</span>All
            </h1>
            <p className="text-xs text-muted">{SITE.tagline}</p>
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}

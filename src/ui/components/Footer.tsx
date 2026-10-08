import { SITE } from '../siteConfig'

const link = 'font-medium text-fg underline decoration-line underline-offset-4 hover:decoration-brand'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          Hecho por{' '}
          <a className={link} href={SITE.authorUrl} target="_blank" rel="noreferrer">
            {SITE.author}
          </a>{' '}
          con React, TypeScript y Tailwind CSS.
        </p>
        <a className={link} href={SITE.repoUrl} target="_blank" rel="noreferrer">
          Ver el código en GitHub
        </a>
      </div>
    </footer>
  )
}

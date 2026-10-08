import type { KeyboardEvent } from 'react'
import { SAMPLE_WORDS } from '../siteConfig'

interface WordListInputProps {
  value: string
  wordCount: number
  onChange: (value: string) => void
  /** Se llama con Ctrl + Enter (Cmd + Enter en Mac). */
  onSubmit: () => void
}

const linkButton = 'text-sm font-medium text-brand hover:underline disabled:opacity-40 disabled:no-underline'

export function WordListInput({ value, wordCount, onChange, onSubmit }: WordListInputProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor="word-list" className="font-medium">
          Palabras
        </label>
        <span className="text-xs text-muted">{wordCount} en la lista</span>
      </div>

      <textarea
        id="word-list"
        rows={8}
        className="w-full resize-y rounded-lg border border-line bg-page p-3 font-mono text-sm placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/25 focus:outline-none"
        placeholder={'Una por línea o separadas por comas\nSol\nLuna\nEstrella'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-describedby="word-list-hint"
      />

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 whitespace-nowrap">
        <div className="flex gap-3">
          <button type="button" className={linkButton} onClick={() => onChange(SAMPLE_WORDS.join('\n'))}>
            Cargar ejemplo
          </button>
          <button type="button" className={linkButton} disabled={value === ''} onClick={() => onChange('')}>
            Limpiar
          </button>
        </div>
        <p id="word-list-hint" className="hidden text-xs text-muted sm:block">
          <kbd className="rounded border border-line px-1 font-sans">Ctrl</kbd> +{' '}
          <kbd className="rounded border border-line px-1 font-sans">Enter</kbd> para generar
        </p>
      </div>
    </div>
  )
}

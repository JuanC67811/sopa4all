import type { RejectedWord, RejectionReason } from '../../domain/models'

const REASON_TEXT: Record<RejectionReason, string> = {
  tooLong: 'es más larga que la cuadrícula',
  duplicate: 'está repetida',
  invalid: 'tiene caracteres que no son letras',
}

interface GenerationWarningsProps {
  rejectedWords: RejectedWord[]
  unplacedWords: string[]
}

/** Explica qué palabras no aparecen en la sopa y por qué. No muestra nada si todo fue bien. */
export function GenerationWarnings({ rejectedWords, unplacedWords }: GenerationWarningsProps) {
  if (rejectedWords.length === 0 && unplacedWords.length === 0) return null

  return (
    <div role="status" className="space-y-1 rounded-lg bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
      {rejectedWords.map(({ word, reason }) => (
        <p key={`${word}-${reason}`}>
          <strong>{word}</strong> se descartó porque {REASON_TEXT[reason]}.
        </p>
      ))}
      {unplacedWords.length > 0 && (
        <p>
          No cupieron: <strong>{unplacedWords.join(', ')}</strong>. Prueba con una cuadrícula más grande, más
          direcciones o menos palabras.
        </p>
      )}
    </div>
  )
}

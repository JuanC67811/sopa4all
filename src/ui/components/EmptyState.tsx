import { Logo } from './Logo'

const STEPS = ['Escribe tus palabras', 'Ajusta tamaño y direcciones', 'Genera y descarga en PDF']

interface EmptyStateProps {
  onLoadSample: () => void
}

/** Lo que se ve antes de generar la primera sopa: explica qué hacer y ofrece un atajo. */
export function EmptyState({ onLoadSample }: EmptyStateProps) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-line p-8 text-center">
      <Logo className="size-16 motion-safe:animate-pop-in" />
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Crea tu primera sopa de letras</h2>
        <p className="max-w-sm text-sm text-muted">Personalizada con tus palabras, lista para jugar en pantalla o imprimir.</p>
      </div>

      <ol className="flex flex-wrap justify-center gap-2 text-sm">
        {STEPS.map((step, index) => (
          <li key={step} className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 ring-1 ring-line">
            <span className="grid size-5 place-items-center rounded-full bg-brand text-xs font-bold text-on-brand">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={onLoadSample}
        className="rounded-lg bg-brand-soft px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-on-brand"
      >
        Probar con palabras de ejemplo
      </button>
    </div>
  )
}

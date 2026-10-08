interface ToolbarProps {
  showSolution: boolean
  onToggleSolution: () => void
  includeSolutionInPdf: boolean
  onIncludeSolutionInPdfChange: (include: boolean) => void
  isExporting: boolean
  exportError: string | null
  onExportPdf: () => void
}

const button =
  'rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60'

/** Acciones sobre la sopa ya generada. */
export function Toolbar({
  showSolution,
  onToggleSolution,
  includeSolutionInPdf,
  onIncludeSolutionInPdfChange,
  isExporting,
  exportError,
  onExportPdf,
}: ToolbarProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          aria-pressed={showSolution}
          className={`${button} ring-1 ring-line hover:bg-surface-muted aria-pressed:bg-brand-soft aria-pressed:text-brand aria-pressed:ring-brand/40`}
          onClick={onToggleSolution}
        >
          {showSolution ? 'Ocultar solución' : 'Mostrar solución'}
        </button>

        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              className="size-4 accent-brand"
              checked={includeSolutionInPdf}
              onChange={(event) => onIncludeSolutionInPdfChange(event.target.checked)}
            />
            Incluir solución
          </label>
          <button
            type="button"
            className={`${button} bg-fg text-page hover:opacity-90`}
            disabled={isExporting}
            onClick={onExportPdf}
          >
            {isExporting ? 'Creando PDF…' : 'Descargar PDF'}
          </button>
        </div>
      </div>

      {exportError && (
        <p role="alert" className="text-sm text-danger">
          {exportError}
        </p>
      )}
    </div>
  )
}

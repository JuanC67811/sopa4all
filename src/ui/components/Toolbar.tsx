interface ToolbarProps {
  showSolution: boolean
  onToggleSolution: () => void
  includeSolutionInPdf: boolean
  onIncludeSolutionInPdfChange: (include: boolean) => void
  isExporting: boolean
  exportError: string | null
  onExportPdf: () => void
}

const secondaryButton =
  'rounded-lg bg-white px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60'

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
      <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
        <button
          type="button"
          aria-pressed={showSolution}
          className={`${secondaryButton} aria-pressed:bg-blue-50 aria-pressed:text-blue-700 aria-pressed:ring-blue-300`}
          onClick={onToggleSolution}
        >
          {showSolution ? 'Ocultar solución' : 'Mostrar solución'}
        </button>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-blue-600"
              checked={includeSolutionInPdf}
              onChange={(event) => onIncludeSolutionInPdfChange(event.target.checked)}
            />
            Incluir solución
          </label>
          <button type="button" className={secondaryButton} disabled={isExporting} onClick={onExportPdf}>
            {isExporting ? 'Creando PDF…' : 'Descargar PDF'}
          </button>
        </div>
      </div>

      {exportError && (
        <p role="alert" className="text-right text-sm text-red-600">
          {exportError}
        </p>
      )}
    </div>
  )
}

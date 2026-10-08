interface ToolbarProps {
  showSolution: boolean
  onToggleSolution: () => void
}

/** Acciones sobre la sopa ya generada. En el Paso 9 se suma aquí "Exportar a PDF". */
export function Toolbar({ showSolution, onToggleSolution }: ToolbarProps) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <button
        type="button"
        aria-pressed={showSolution}
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-50 aria-pressed:bg-blue-50 aria-pressed:text-blue-700 aria-pressed:ring-blue-300"
        onClick={onToggleSolution}
      >
        {showSolution ? 'Ocultar solución' : 'Mostrar solución'}
      </button>
    </div>
  )
}

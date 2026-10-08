import { useCallback, useState } from 'react'
import type { Puzzle } from '../domain/models'
import type { PuzzleExporter } from './PuzzleExporter'

/** Estado del botón "Descargar PDF". Recibe el exportador desde fuera (lo elige App). */
export function usePdfExport(exporter: PuzzleExporter) {
  const [includeSolution, setIncludeSolution] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const exportPdf = useCallback(
    async (puzzle: Puzzle) => {
      setIsExporting(true)
      setError(null)
      try {
        await exporter.export(puzzle, { withSolution: includeSolution })
      } catch {
        setError('No se pudo crear el PDF. Inténtalo de nuevo.')
      } finally {
        setIsExporting(false)
      }
    },
    [exporter, includeSolution],
  )

  return { includeSolution, setIncludeSolution, isExporting, error, exportPdf }
}

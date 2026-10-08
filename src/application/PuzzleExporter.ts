import type { Puzzle } from '../domain/models'

export interface ExportOptions {
  /** Añade una página con la solución marcada. */
  withSolution: boolean
}

/**
 * Lo que la aplicación necesita para exportar, sin saber CÓMO se hace.
 * Hoy lo implementa jsPDF (infrastructure/pdf); mañana podría ser otra librería
 * sin tocar ni el hook ni los componentes.
 */
export interface PuzzleExporter {
  export(puzzle: Puzzle, options: ExportOptions): Promise<void>
}

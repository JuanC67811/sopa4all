import { getPlacementCells } from './directions'
import type { Placement, Position } from './models'

/** Un segmento que va de la primera a la última letra de una palabra. */
export interface SolutionLine {
  word: string
  from: Position
  to: Position
}

/**
 * Convierte los placements en líneas para dibujar la solución.
 * La misma geometría sirve para la pantalla y para el PDF.
 */
export function getSolutionLines(placements: Placement[]): SolutionLine[] {
  return placements.map((placement) => {
    const cells = getPlacementCells(placement)
    return { word: placement.word, from: cells[0], to: cells[cells.length - 1] }
  })
}

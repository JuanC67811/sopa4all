import { getPlacementCells } from './directions'
import type { Placement, Position } from './models'

/** Un segmento que va de la primera a la última letra de una palabra. */
export interface SolutionLine {
  word: string
  from: Position
  to: Position
}

/**
 * Tono (0-360) de la línea de cada palabra, para pantalla y PDF.
 * Saltar 137,5° (el "ángulo de oro") por la rueda de color reparte bien los tonos
 * aunque haya muchas palabras: dos colores seguidos nunca se parecen.
 */
export function solutionHue(index: number): number {
  return (index * 137.5) % 360
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

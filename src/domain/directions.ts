import type { Direction, Placement, Position } from './models'

/** Cuánto avanzan la fila y la columna en cada paso de una dirección. */
export interface Vector {
  dRow: number
  dCol: number
}

export const DIRECTION_VECTORS: Record<Direction, Vector> = {
  horizontal: { dRow: 0, dCol: 1 }, // →
  vertical: { dRow: 1, dCol: 0 }, // ↓
  diagonalDown: { dRow: 1, dCol: 1 }, // ↘
  diagonalUp: { dRow: -1, dCol: 1 }, // ↗
}

/** Las celdas que ocupa una palabra de `length` letras que empieza en `start`. */
export function getCells(start: Position, direction: Direction, length: number): Position[] {
  const { dRow, dCol } = DIRECTION_VECTORS[direction]
  return Array.from({ length }, (_, i) => ({
    row: start.row + dRow * i,
    col: start.col + dCol * i,
  }))
}

/** Las celdas de una palabra ya colocada (sirve para resaltar la solución). */
export function getPlacementCells(placement: Placement): Position[] {
  return getCells(placement.start, placement.direction, placement.word.length)
}

/** ¿Cabe una palabra de `length` letras dentro de la cuadrícula empezando en `start`? */
export function fitsInGrid(start: Position, direction: Direction, length: number, size: number): boolean {
  const { dRow, dCol } = DIRECTION_VECTORS[direction]
  const endRow = start.row + dRow * (length - 1)
  const endCol = start.col + dCol * (length - 1)
  return endRow >= 0 && endRow < size && endCol >= 0 && endCol < size
}

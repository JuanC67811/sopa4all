import { DIRECTION_VECTORS, fitsInGrid, getCells } from './directions'
import type { Direction } from './models'

const DIRECTIONS = Object.keys(DIRECTION_VECTORS) as Direction[]

/**
 * Cuántas veces aparece una palabra en la cuadrícula, en cualquier dirección y sentido.
 * Si sale más de una vez, la sopa es ambigua: el jugador podría marcar la "equivocada".
 */
export function countOccurrences(grid: string[][], word: string): number {
  const size = grid.length
  const reversed = [...word].reverse().join('')
  let count = 0

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      for (const direction of DIRECTIONS) {
        if (!fitsInGrid({ row, col }, direction, word.length, size)) continue
        const text = getCells({ row, col }, direction, word.length)
          .map((cell) => grid[cell.row][cell.col])
          .join('')
        // Leer al revés cubre las otras 4 direcciones (←, ↑, ↖, ↙).
        // Un palíndromo (OSO) coincide en ambos sentidos, pero solo se cuenta una vez.
        if (text === word || text === reversed) count++
      }
    }
  }
  return count
}

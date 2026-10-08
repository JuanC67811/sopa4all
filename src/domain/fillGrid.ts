import type { WorkingGrid } from './placeWords'
import type { RandomFn } from './shuffle'

export const SPANISH_ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'

/** Devuelve una cuadrícula nueva con cada celda vacía rellena con una letra al azar. */
export function fillGrid(
  grid: WorkingGrid,
  random: RandomFn = Math.random,
  alphabet: string = SPANISH_ALPHABET,
): string[][] {
  const letters = [...alphabet]
  return grid.map((row) =>
    row.map((cell) => cell ?? letters[Math.floor(random() * letters.length)]),
  )
}

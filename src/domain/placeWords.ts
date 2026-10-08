import { fitsInGrid, getCells } from './directions'
import type { Placement, PuzzleConfig } from './models'
import { shuffle, type RandomFn } from './shuffle'

/** Una celda vacía es null; una ocupada guarda su letra. */
export type WorkingGrid = (string | null)[][]

export interface PlacementResult {
  grid: WorkingGrid
  placements: Placement[]
  unplaced: string[]
}

type PlacementOptions = Pick<PuzzleConfig, 'size' | 'directions' | 'allowReversed'>

export function createEmptyGrid(size: number): WorkingGrid {
  return Array.from({ length: size }, () => Array<string | null>(size).fill(null))
}

/** Las letras tal como se escriben en la cuadrícula (al revés si reversed es true). */
export function lettersOf(placement: Pick<Placement, 'word' | 'reversed'>): string[] {
  const letters = [...placement.word]
  return placement.reversed ? letters.reverse() : letters
}

/** Una palabra se puede colocar si cada celda está vacía o ya tiene la misma letra (un cruce). */
export function canPlace(grid: WorkingGrid, placement: Placement): boolean {
  const letters = lettersOf(placement)
  const cells = getCells(placement.start, placement.direction, letters.length)
  return cells.every(({ row, col }, i) => grid[row][col] === null || grid[row][col] === letters[i])
}

function writePlacement(grid: WorkingGrid, placement: Placement): void {
  const letters = lettersOf(placement)
  getCells(placement.start, placement.direction, letters.length).forEach(({ row, col }, i) => {
    grid[row][col] = letters[i]
  })
}

/**
 * Enumera TODAS las posiciones donde la palabra cabe dentro de los límites.
 * Como la lista es finita, el algoritmo siempre termina (no hay "probar al azar hasta que funcione").
 */
function listCandidates(word: string, options: PlacementOptions): Placement[] {
  const candidates: Placement[] = []
  const reversedOptions = options.allowReversed ? [false, true] : [false]

  for (let row = 0; row < options.size; row++) {
    for (let col = 0; col < options.size; col++) {
      for (const direction of options.directions) {
        if (!fitsInGrid({ row, col }, direction, word.length, options.size)) continue
        for (const reversed of reversedOptions) {
          candidates.push({ word, start: { row, col }, direction, reversed })
        }
      }
    }
  }
  return candidates
}

/**
 * Coloca las palabras en una cuadrícula vacía.
 * Las palabras deben venir ya normalizadas (ver normalizeWords).
 */
export function placeWords(
  words: string[],
  options: PlacementOptions,
  random: RandomFn = Math.random,
): PlacementResult {
  const grid = createEmptyGrid(options.size)
  const placements: Placement[] = []
  const unplaced: string[] = []

  // Las largas primero: son las difíciles de ubicar y así encuentran la cuadrícula vacía.
  const byLength = [...words].sort((a, b) => b.length - a.length)

  for (const word of byLength) {
    const candidates = shuffle(listCandidates(word, options), random)
    const chosen = candidates.find((candidate) => canPlace(grid, candidate))

    if (chosen) {
      writePlacement(grid, chosen)
      placements.push(chosen)
    } else {
      unplaced.push(word)
    }
  }

  return { grid, placements, unplaced }
}

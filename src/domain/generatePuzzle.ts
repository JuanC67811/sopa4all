import { countOccurrences } from './countOccurrences'
import { fillGrid } from './fillGrid'
import type { GenerationResult, Placement, PuzzleConfig } from './models'
import { normalizeWords } from './normalizeWords'
import { placeWords } from './placeWords'
import type { RandomFn } from './shuffle'

/** Cuántas sopas completas probamos antes de quedarnos con la mejor. */
export const MAX_ATTEMPTS = 20

interface Attempt {
  grid: string[][]
  placements: Placement[]
  unplaced: string[]
  /** Palabras que aparecen más de una vez en la cuadrícula. */
  ambiguous: number
}

function runAttempt(words: string[], config: PuzzleConfig, random: RandomFn): Attempt {
  const { grid: workingGrid, placements, unplaced } = placeWords(words, config, random)
  const grid = fillGrid(workingGrid, random)
  const ambiguous = placements.filter((p) => countOccurrences(grid, p.word) > 1).length
  return { grid, placements, unplaced, ambiguous }
}

/** Un intento es mejor si deja menos palabras fuera; a igualdad, si es menos ambiguo. */
function isBetter(a: Attempt, b: Attempt): boolean {
  if (a.unplaced.length !== b.unplaced.length) return a.unplaced.length < b.unplaced.length
  return a.ambiguous < b.ambiguous
}

/**
 * Punto de entrada del dominio: de la configuración del usuario a la sopa terminada.
 * Normaliza → coloca → rellena, y repite hasta MAX_ATTEMPTS veces si el resultado no es perfecto.
 */
export function generatePuzzle(config: PuzzleConfig, random: RandomFn = Math.random): GenerationResult {
  const { valid, rejected } = normalizeWords(config.words, config.size)

  let best = runAttempt(valid, config, random)
  for (let i = 1; i < MAX_ATTEMPTS; i++) {
    if (best.unplaced.length === 0 && best.ambiguous === 0) break
    const attempt = runAttempt(valid, config, random)
    if (isBetter(attempt, best)) best = attempt
  }

  return {
    puzzle: { size: config.size, grid: best.grid, placements: best.placements },
    unplacedWords: best.unplaced,
    rejectedWords: rejected,
  }
}

import type { RandomFn } from '../shuffle'

/** Generador pseudoaleatorio con semilla: los tests dan siempre el mismo resultado. */
export function seededRandom(seed: number): RandomFn {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 2 ** 32
    return state / 2 ** 32
  }
}

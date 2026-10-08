import { describe, expect, it } from 'vitest'
import type { Placement } from '../models'
import { getSolutionLines } from '../solution'

describe('getSolutionLines', () => {
  it('va de la primera a la última celda de cada palabra', () => {
    const placements: Placement[] = [
      { word: 'SOL', start: { row: 2, col: 3 }, direction: 'horizontal', reversed: false },
      { word: 'MAR', start: { row: 4, col: 0 }, direction: 'diagonalUp', reversed: true },
    ]
    expect(getSolutionLines(placements)).toEqual([
      { word: 'SOL', from: { row: 2, col: 3 }, to: { row: 2, col: 5 } },
      { word: 'MAR', from: { row: 4, col: 0 }, to: { row: 2, col: 2 } },
    ])
  })

  it('devuelve una lista vacía si no hay palabras', () => {
    expect(getSolutionLines([])).toEqual([])
  })
})

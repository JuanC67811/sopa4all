import { describe, expect, it } from 'vitest'
import { fitsInGrid, getCells } from '../directions'

describe('getCells', () => {
  it('avanza hacia la derecha en horizontal', () => {
    expect(getCells({ row: 2, col: 0 }, 'horizontal', 3)).toEqual([
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ])
  })

  it('sube y avanza en diagonalUp', () => {
    expect(getCells({ row: 2, col: 0 }, 'diagonalUp', 3)).toEqual([
      { row: 2, col: 0 },
      { row: 1, col: 1 },
      { row: 0, col: 2 },
    ])
  })
})

describe('fitsInGrid', () => {
  it('acepta una palabra que llega justo al borde', () => {
    expect(fitsInGrid({ row: 0, col: 2 }, 'horizontal', 3, 5)).toBe(true)
  })

  it('rechaza una palabra que se sale por la derecha', () => {
    expect(fitsInGrid({ row: 0, col: 3 }, 'horizontal', 3, 5)).toBe(false)
  })

  it('rechaza una diagonal hacia arriba que se sale por arriba', () => {
    expect(fitsInGrid({ row: 1, col: 0 }, 'diagonalUp', 3, 5)).toBe(false)
  })
})

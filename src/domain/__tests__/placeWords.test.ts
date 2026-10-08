import { describe, expect, it } from 'vitest'
import { getPlacementCells } from '../directions'
import type { Direction, Placement } from '../models'
import { canPlace, createEmptyGrid, lettersOf, placeWords, type WorkingGrid } from '../placeWords'
import { shuffle } from '../shuffle'
import { seededRandom } from './helpers'

const ALL_DIRECTIONS: Direction[] = ['horizontal', 'vertical', 'diagonalDown', 'diagonalUp']

/** Lee de la cuadrícula las letras que ocupa una palabra colocada. */
function readFromGrid(grid: WorkingGrid, placement: Placement): string {
  return getPlacementCells(placement)
    .map(({ row, col }) => grid[row][col])
    .join('')
}

describe('shuffle', () => {
  it('conserva los mismos elementos y no modifica el original', () => {
    const original = [1, 2, 3, 4, 5]
    const shuffled = shuffle(original, seededRandom(1))
    expect([...shuffled].sort()).toEqual(original)
    expect(original).toEqual([1, 2, 3, 4, 5])
  })
})

describe('canPlace', () => {
  const placement: Placement = {
    word: 'SOL',
    start: { row: 0, col: 0 },
    direction: 'horizontal',
    reversed: false,
  }

  it('acepta una cuadrícula vacía', () => {
    expect(canPlace(createEmptyGrid(5), placement)).toBe(true)
  })

  it('acepta un cruce con la misma letra', () => {
    const grid = createEmptyGrid(5)
    grid[0][1] = 'O'
    expect(canPlace(grid, placement)).toBe(true)
  })

  it('rechaza una celda ocupada por otra letra', () => {
    const grid = createEmptyGrid(5)
    grid[0][1] = 'X'
    expect(canPlace(grid, placement)).toBe(false)
  })
})

describe('placeWords', () => {
  const words = ['SOL', 'LUNA', 'ESTRELLA', 'PLANETA', 'COMETA', 'GALAXIA']
  const options = { size: 15, directions: ALL_DIRECTIONS, allowReversed: true }

  it('coloca todas las palabras cuando hay espacio de sobra', () => {
    const result = placeWords(words, options, seededRandom(42))
    expect(result.unplaced).toEqual([])
    expect(result.placements.map((p) => p.word).sort()).toEqual([...words].sort())
  })

  it('cada palabra se puede leer en la cuadrícula donde dice su placement', () => {
    // Probamos con varias semillas para cubrir muchas posiciones distintas.
    for (let seed = 1; seed <= 50; seed++) {
      const { grid, placements } = placeWords(words, options, seededRandom(seed))
      for (const placement of placements) {
        expect(readFromGrid(grid, placement)).toBe(lettersOf(placement).join(''))
      }
    }
  })

  it('solo usa las direcciones permitidas', () => {
    const result = placeWords(words, { ...options, directions: ['vertical'] }, seededRandom(7))
    expect(result.placements.every((p) => p.direction === 'vertical')).toBe(true)
  })

  it('no invierte palabras si allowReversed es false', () => {
    const result = placeWords(words, { ...options, allowReversed: false }, seededRandom(7))
    expect(result.placements.every((p) => !p.reversed)).toBe(true)
  })

  it('devuelve en unplaced lo que no cabe, sin colgarse', () => {
    // En una cuadrícula de 3x3 no caben 4 palabras de 3 letras sin letras en común.
    const result = placeWords(['ABC', 'DEF', 'GHI', 'JKL'], { ...options, size: 3 }, seededRandom(3))
    expect(result.unplaced.length).toBeGreaterThan(0)
    expect(result.placements.length + result.unplaced.length).toBe(4)
  })

  it('deja vacías (null) las celdas que no usa ninguna palabra', () => {
    const { grid } = placeWords(['SOL'], options, seededRandom(1))
    const filled = grid.flat().filter((cell) => cell !== null)
    expect(filled).toHaveLength(3)
  })
})

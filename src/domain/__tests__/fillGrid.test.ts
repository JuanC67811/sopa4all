import { describe, expect, it } from 'vitest'
import { fillGrid, SPANISH_ALPHABET } from '../fillGrid'
import { createEmptyGrid } from '../placeWords'
import { seededRandom } from './helpers'

describe('fillGrid', () => {
  it('no deja ninguna celda vacía', () => {
    const filled = fillGrid(createEmptyGrid(10), seededRandom(1))
    expect(filled.flat().every((cell) => cell.length === 1)).toBe(true)
  })

  it('conserva las letras de las palabras ya colocadas', () => {
    const grid = createEmptyGrid(3)
    grid[1][1] = 'Ñ'
    expect(fillGrid(grid, seededRandom(1))[1][1]).toBe('Ñ')
  })

  it('solo usa letras del alfabeto', () => {
    const filled = fillGrid(createEmptyGrid(15), seededRandom(5))
    expect(filled.flat().every((cell) => SPANISH_ALPHABET.includes(cell))).toBe(true)
  })

  it('no modifica la cuadrícula original', () => {
    const grid = createEmptyGrid(3)
    fillGrid(grid, seededRandom(1))
    expect(grid.flat().every((cell) => cell === null)).toBe(true)
  })
})

import { describe, expect, it } from 'vitest'
import { countOccurrences } from '../countOccurrences'
import { generatePuzzle } from '../generatePuzzle'
import { DEFAULT_CONFIG, type PuzzleConfig } from '../models'
import { seededRandom } from './helpers'

const config: PuzzleConfig = {
  ...DEFAULT_CONFIG,
  words: ['Sol', 'Luna', 'Estrella', 'Planeta', 'Cometa', 'Galaxia', 'Órbita', 'Año'],
}

describe('generatePuzzle', () => {
  it('genera una cuadrícula completa del tamaño pedido', () => {
    const { puzzle } = generatePuzzle(config, seededRandom(1))
    expect(puzzle.grid).toHaveLength(15)
    expect(puzzle.grid.every((row) => row.length === 15)).toBe(true)
    expect(puzzle.grid.flat().every((cell) => cell.length === 1)).toBe(true)
  })

  it('coloca todas las palabras normalizadas', () => {
    const { puzzle, unplacedWords } = generatePuzzle(config, seededRandom(1))
    expect(unplacedWords).toEqual([])
    expect(puzzle.placements.map((p) => p.word).sort()).toEqual(
      ['AÑO', 'COMETA', 'ESTRELLA', 'GALAXIA', 'LUNA', 'ORBITA', 'PLANETA', 'SOL'].sort(),
    )
  })

  it('cada palabra aparece exactamente una vez', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const { puzzle } = generatePuzzle(config, seededRandom(seed))
      for (const { word } of puzzle.placements) {
        expect(countOccurrences(puzzle.grid, word)).toBe(1)
      }
    }
  })

  it('informa las palabras rechazadas al normalizar', () => {
    const result = generatePuzzle({ ...config, words: ['sol', 'SOL', 'r2d2'] }, seededRandom(1))
    expect(result.rejectedWords).toEqual([
      { word: 'SOL', reason: 'duplicate' },
      { word: 'r2d2', reason: 'invalid' },
    ])
  })

  it('informa las palabras que no cupieron', () => {
    const result = generatePuzzle(
      { ...config, size: 3, words: ['ABC', 'DEF', 'GHI', 'JKL'] },
      seededRandom(1),
    )
    expect(result.unplacedWords.length).toBeGreaterThan(0)
  })
})

import { describe, expect, it } from 'vitest'
import { seededRandom } from '../../../domain/__tests__/helpers'
import { generatePuzzle } from '../../../domain/generatePuzzle'
import { DEFAULT_CONFIG } from '../../../domain/models'
import { buildPuzzlePdf } from '../jsPdfExporter'

const { puzzle } = generatePuzzle({ ...DEFAULT_CONFIG, words: ['sol', 'luna', 'año'] }, seededRandom(1))

describe('buildPuzzlePdf', () => {
  it('crea una sola página sin solución', async () => {
    const doc = await buildPuzzlePdf(puzzle, { withSolution: false })
    expect(doc.getNumberOfPages()).toBe(1)
  })

  it('añade una segunda página con la solución', async () => {
    const doc = await buildPuzzlePdf(puzzle, { withSolution: true })
    expect(doc.getNumberOfPages()).toBe(2)
  })

  it('escribe las palabras a buscar como texto (no como imagen)', async () => {
    const content = (await buildPuzzlePdf(puzzle, { withSolution: false })).output()
    expect(content).toContain('(LUNA) Tj')
    expect(content).toContain('(SOL) Tj')
  })
})

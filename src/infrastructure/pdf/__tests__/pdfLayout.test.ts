import { describe, expect, it } from 'vitest'
import { computeLayout, PAGE } from '../pdfLayout'

describe('computeLayout', () => {
  it('usa todo el ancho útil con pocas palabras', () => {
    const layout = computeLayout(15, 8)
    expect(layout.gridSide).toBe(PAGE.width - 2 * PAGE.margin)
    expect(layout.cellSize).toBeCloseTo(layout.gridSide / 15)
  })

  it('centra la cuadrícula horizontalmente', () => {
    const { gridX, gridSide } = computeLayout(15, 8)
    expect(gridX + gridSide / 2).toBeCloseTo(PAGE.width / 2)
  })

  it('encoge la cuadrícula para que quepa una lista larga de palabras', () => {
    const layout = computeLayout(15, 60)
    const lastRowY = layout.wordsY + (Math.ceil(60 / layout.wordColumns) - 1) * layout.wordRowHeight
    expect(layout.gridSide).toBeLessThan(PAGE.width - 2 * PAGE.margin)
    expect(lastRowY).toBeLessThanOrEqual(PAGE.height - PAGE.margin)
  })
})

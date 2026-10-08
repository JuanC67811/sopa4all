import { describe, expect, it } from 'vitest'
import { parseWordList } from '../parseWordList'

describe('parseWordList', () => {
  it('separa por líneas', () => {
    expect(parseWordList('sol\nluna\r\nmar')).toEqual(['sol', 'luna', 'mar'])
  })

  it('separa por comas y punto y coma', () => {
    expect(parseWordList('sol, luna; mar')).toEqual(['sol', 'luna', 'mar'])
  })

  it('ignora entradas vacías', () => {
    expect(parseWordList('sol,,\n\n  ,luna')).toEqual(['sol', 'luna'])
  })

  it('mantiene los espacios internos (normalizeWords decide qué hacer con ellos)', () => {
    expect(parseWordList('pie grande')).toEqual(['pie grande'])
  })
})

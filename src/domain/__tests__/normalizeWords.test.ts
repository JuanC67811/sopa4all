import { describe, expect, it } from 'vitest'
import { normalizeWord, normalizeWords } from '../normalizeWords'

describe('normalizeWord', () => {
  it('pasa a mayúsculas y quita espacios', () => {
    expect(normalizeWord('  pie grande ')).toBe('PIEGRANDE')
  })

  it('quita tildes y diéresis', () => {
    expect(normalizeWord('canción')).toBe('CANCION')
    expect(normalizeWord('pingüino')).toBe('PINGUINO')
  })

  it('conserva la Ñ', () => {
    expect(normalizeWord('año')).toBe('AÑO')
    expect(normalizeWord('ÑANDÚ')).toBe('ÑANDU')
  })

  it('devuelve la Ñ precompuesta aunque llegue descompuesta', () => {
    const decomposed = 'año' // "año" escrito como n + virgulilla
    expect(normalizeWord(decomposed)).toBe('AÑO')
  })
})

describe('normalizeWords', () => {
  it('normaliza las palabras válidas manteniendo el orden', () => {
    const result = normalizeWords(['sol', 'Luna', 'estrella'], 15)
    expect(result.valid).toEqual(['SOL', 'LUNA', 'ESTRELLA'])
    expect(result.rejected).toEqual([])
  })

  it('ignora las líneas vacías sin rechazarlas', () => {
    const result = normalizeWords(['sol', '', '   '], 15)
    expect(result.valid).toEqual(['SOL'])
    expect(result.rejected).toEqual([])
  })

  it('rechaza palabras más largas que la cuadrícula', () => {
    const result = normalizeWords(['sol', 'electroencefalograma'], 10)
    expect(result.valid).toEqual(['SOL'])
    expect(result.rejected).toEqual([{ word: 'electroencefalograma', reason: 'tooLong' }])
  })

  it('acepta una palabra que mide exactamente el tamaño', () => {
    expect(normalizeWords(['abcde'], 5).valid).toEqual(['ABCDE'])
  })

  it('rechaza duplicados aunque difieran en tildes o mayúsculas', () => {
    const result = normalizeWords(['Canción', 'cancion'], 15)
    expect(result.valid).toEqual(['CANCION'])
    expect(result.rejected).toEqual([{ word: 'cancion', reason: 'duplicate' }])
  })

  it('rechaza palabras con números o símbolos', () => {
    const result = normalizeWords(['r2d2', 'hola!', 'mar'], 15)
    expect(result.valid).toEqual(['MAR'])
    expect(result.rejected.map((r) => r.reason)).toEqual(['invalid', 'invalid'])
  })
})

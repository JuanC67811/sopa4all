import { describe, expect, it } from 'vitest'
import { hslToRgb } from '../hslToRgb'

describe('hslToRgb', () => {
  it('convierte los colores básicos', () => {
    expect(hslToRgb(0, 1, 0.5)).toEqual([255, 0, 0])
    expect(hslToRgb(120, 1, 0.5)).toEqual([0, 255, 0])
    expect(hslToRgb(240, 1, 0.5)).toEqual([0, 0, 255])
  })

  it('sin saturación da grises', () => {
    expect(hslToRgb(200, 0, 0.5)).toEqual([128, 128, 128])
  })
})

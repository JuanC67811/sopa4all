// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { seededRandom } from '../../domain/__tests__/helpers'
import { DEFAULT_CONFIG, MAX_SIZE, MIN_SIZE } from '../../domain/models'
import { usePuzzleGenerator } from '../usePuzzleGenerator'

// La misma función en cada render, como haría la app con Math.random.
const random = seededRandom(1)
const setup = () => renderHook(() => usePuzzleGenerator(random))

describe('usePuzzleGenerator', () => {
  it('empieza con la configuración por defecto y sin sopa', () => {
    const { result } = setup()
    expect(result.current.settings).toEqual(DEFAULT_CONFIG)
    expect(result.current.result).toBeNull()
    expect(result.current.canGenerate).toBe(false)
  })

  it('genera la sopa con las palabras escritas', () => {
    const { result } = setup()
    act(() => result.current.setWordsText('sol\nluna\nmar'))
    act(() => result.current.generate())

    const words = result.current.result?.puzzle.placements.map((p) => p.word).sort()
    expect(words).toEqual(['LUNA', 'MAR', 'SOL'])
  })

  it('no genera nada al escribir, solo al llamar a generate', () => {
    const { result } = setup()
    act(() => result.current.setWordsText('sol'))
    expect(result.current.result).toBeNull()
  })

  it('usa el tamaño elegido', () => {
    const { result } = setup()
    act(() => {
      result.current.setWordsText('sol')
      result.current.updateSettings({ size: 8 })
    })
    act(() => result.current.generate())
    expect(result.current.result?.puzzle.grid).toHaveLength(8)
  })

  it('limita el tamaño a un rango razonable', () => {
    const { result } = setup()
    act(() => result.current.updateSettings({ size: 1 }))
    expect(result.current.settings.size).toBe(MIN_SIZE)
    act(() => result.current.updateSettings({ size: 999 }))
    expect(result.current.settings.size).toBe(MAX_SIZE)
  })

  it('no permite generar sin direcciones', () => {
    const { result } = setup()
    act(() => {
      result.current.setWordsText('sol')
      result.current.updateSettings({ directions: [] })
    })
    expect(result.current.canGenerate).toBe(false)
    act(() => result.current.generate())
    expect(result.current.result).toBeNull()
  })
})

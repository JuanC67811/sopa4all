// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Puzzle } from '../../domain/models'
import type { PuzzleExporter } from '../PuzzleExporter'
import { usePdfExport } from '../usePdfExport'

const puzzle: Puzzle = { size: 1, grid: [['A']], placements: [] }

// Un exportador falso: así probamos el hook sin generar ningún PDF real.
const fakeExporter = (impl: PuzzleExporter['export'] = async () => {}) => ({ export: vi.fn(impl) })

describe('usePdfExport', () => {
  it('pasa la sopa y la opción de solución al exportador', async () => {
    const exporter = fakeExporter()
    const { result } = renderHook(() => usePdfExport(exporter))

    act(() => result.current.setIncludeSolution(false))
    await act(() => result.current.exportPdf(puzzle))

    expect(exporter.export).toHaveBeenCalledWith(puzzle, { withSolution: false })
    expect(result.current.isExporting).toBe(false)
  })

  it('incluye la solución por defecto', async () => {
    const exporter = fakeExporter()
    const { result } = renderHook(() => usePdfExport(exporter))
    await act(() => result.current.exportPdf(puzzle))
    expect(exporter.export).toHaveBeenCalledWith(puzzle, { withSolution: true })
  })

  it('muestra un mensaje si el exportador falla', async () => {
    const exporter = fakeExporter(async () => {
      throw new Error('disco lleno')
    })
    const { result } = renderHook(() => usePdfExport(exporter))
    await act(() => result.current.exportPdf(puzzle))

    expect(result.current.error).toMatch(/no se pudo crear el pdf/i)
    expect(result.current.isExporting).toBe(false)
  })
})

import { useCallback, useMemo, useState } from 'react'
import { generatePuzzle } from '../domain/generatePuzzle'
import {
  DEFAULT_CONFIG,
  MAX_SIZE,
  MIN_SIZE,
  type GenerationResult,
  type PuzzleSettings,
} from '../domain/models'
import { parseWordList } from '../domain/parseWordList'
import type { RandomFn } from '../domain/shuffle'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/**
 * Guarda el estado de la pantalla (texto de palabras, ajustes y sopa generada)
 * y conecta la UI con el dominio. Los componentes no llaman a generatePuzzle directamente.
 */
export function usePuzzleGenerator(random: RandomFn = Math.random) {
  const [wordsText, setWordsText] = useState('')
  const [settings, setSettings] = useState<PuzzleSettings>(DEFAULT_CONFIG)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  /** Cuántas sopas se han generado. La UI lo usa como "key" para animar cada sopa nueva. */
  const [generationCount, setGenerationCount] = useState(0)

  const words = useMemo(() => parseWordList(wordsText), [wordsText])
  const canGenerate = words.length > 0 && settings.directions.length > 0

  const updateSettings = useCallback((changes: Partial<PuzzleSettings>) => {
    setSettings((previous) => {
      const next = { ...previous, ...changes }
      return { ...next, size: clamp(Math.round(next.size), MIN_SIZE, MAX_SIZE) }
    })
  }, [])

  // Solo se genera al llamar a generate() (al pulsar un botón), nunca al escribir:
  // si no, la sopa cambiaría con cada tecla.
  const generate = useCallback(() => {
    if (!canGenerate) return
    setResult(generatePuzzle({ ...settings, words }, random))
    setShowSolution(false) // una sopa nueva empieza sin resolver
    setGenerationCount((count) => count + 1)
  }, [canGenerate, settings, words, random])

  const toggleSolution = useCallback(() => setShowSolution((visible) => !visible), [])

  return {
    wordsText,
    setWordsText,
    words,
    settings,
    updateSettings,
    canGenerate,
    generate,
    result,
    generationCount,
    showSolution,
    toggleSolution,
  }
}

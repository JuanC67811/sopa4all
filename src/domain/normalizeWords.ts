import type { RejectedWord } from './models'

export interface NormalizationResult {
  /** Palabras listas para colocar, en el orden en que llegaron. */
  valid: string[]
  rejected: RejectedWord[]
}

const ENYE = 'Ñ' // Ñ (forma precompuesta)
const COMBINING_TILDE = '̃'
const ONLY_LETTERS = /^[A-ZÑ]+$/

/**
 * Convierte una palabra a la forma en que irá en la cuadrícula:
 * "  Canción " -> "CANCION", "año" -> "AÑO", "pie grande" -> "PIEGRANDE".
 */
export function normalizeWord(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/\s+/g, '')
    // NFD separa cada letra de su acento: "Á" pasa a ser "A" + acento.
    .normalize('NFD')
    // La Ñ también se separa en "N" + virgulilla; la volvemos a unir antes de borrar acentos.
    .replace(new RegExp(`N${COMBINING_TILDE}`, 'g'), ENYE)
    // \p{M} = cualquier marca diacrítica (tildes, diéresis...).
    .replace(/\p{M}/gu, '')
}

/** Limpia la lista del usuario y separa las palabras que se pueden colocar de las que no. */
export function normalizeWords(words: string[], size: number): NormalizationResult {
  const valid: string[] = []
  const rejected: RejectedWord[] = []
  const seen = new Set<string>()

  for (const raw of words) {
    const original = raw.trim()
    if (original === '') continue // líneas vacías: se ignoran sin avisar

    const word = normalizeWord(original)

    if (!ONLY_LETTERS.test(word)) {
      rejected.push({ word: original, reason: 'invalid' })
    } else if (word.length > size) {
      rejected.push({ word: original, reason: 'tooLong' })
    } else if (seen.has(word)) {
      rejected.push({ word: original, reason: 'duplicate' })
    } else {
      seen.add(word)
      valid.push(word)
    }
  }

  return { valid, rejected }
}

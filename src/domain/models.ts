/** Direcciones en las que se puede colocar una palabra. */
export type Direction = 'horizontal' | 'vertical' | 'diagonalDown' | 'diagonalUp'

export const ALL_DIRECTIONS: Direction[] = ['horizontal', 'vertical', 'diagonalDown', 'diagonalUp']

/** Una celda de la cuadrícula. row = fila (de arriba abajo), col = columna (de izquierda a derecha). */
export interface Position {
  row: number
  col: number
}

/** Opciones que elige el usuario antes de generar. */
export interface PuzzleConfig {
  size: number
  words: string[]
  directions: Direction[]
  /** Si es true, algunas palabras pueden aparecer escritas al revés. */
  allowReversed: boolean
}

/** Dónde quedó colocada una palabra. La lista de placements ES la solución. */
export interface Placement {
  /** Palabra ya normalizada (mayúsculas, sin tildes). */
  word: string
  start: Position
  direction: Direction
  reversed: boolean
}

/** La sopa de letras terminada. */
export interface Puzzle {
  size: number
  /** grid[row][col] contiene una sola letra. */
  grid: string[][]
  placements: Placement[]
}

export type RejectionReason = 'tooLong' | 'duplicate' | 'invalid'

export interface RejectedWord {
  word: string
  reason: RejectionReason
}

/** Lo que devuelve el generador: nunca lanza error, informa de lo que no pudo hacer. */
export interface GenerationResult {
  puzzle: Puzzle
  /** Palabras válidas que no encontraron hueco en la cuadrícula. */
  unplacedWords: string[]
  /** Palabras descartadas antes de intentar colocarlas. */
  rejectedWords: RejectedWord[]
}

/** Todo lo configurable menos las palabras: lo que muestran los controles de la UI. */
export type PuzzleSettings = Omit<PuzzleConfig, 'words'>

export const MIN_SIZE = 5
export const MAX_SIZE = 30

export const DEFAULT_CONFIG: PuzzleSettings = {
  size: 15,
  directions: ALL_DIRECTIONS,
  allowReversed: false,
}

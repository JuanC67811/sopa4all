import type { Placement } from '../../domain/models'
import { solutionColor } from '../solutionColors'

interface WordListProps {
  placements: Placement[]
  /** Con la solución visible, cada palabra lleva el color de su línea en la cuadrícula. */
  showSolution: boolean
}

/** Las palabras que hay que encontrar, en orden alfabético. */
export function WordList({ placements, showSolution }: WordListProps) {
  // Guardamos el índice original antes de ordenar: es el que decide el color.
  const words = placements
    .map((placement, index) => ({ word: placement.word, color: solutionColor(index) }))
    .sort((a, b) => a.word.localeCompare(b.word, 'es'))

  return (
    <ul aria-label="Palabras a buscar" className="flex flex-wrap gap-2 xl:flex-col xl:items-start">
      {words.map(({ word, color }) => (
        <li
          key={word}
          className="flex items-center gap-2 rounded-full bg-surface-muted px-3 py-1 font-mono text-sm font-medium"
        >
          {showSolution && <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: color }} />}
          {word}
        </li>
      ))}
    </ul>
  )
}

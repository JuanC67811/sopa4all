import type { Placement } from '../../domain/models'

interface WordListProps {
  placements: Placement[]
}

/** Las palabras que hay que encontrar, en orden alfabético. */
export function WordList({ placements }: WordListProps) {
  const words = placements.map((p) => p.word).sort((a, b) => a.localeCompare(b, 'es'))

  return (
    <ul aria-label="Palabras a buscar" className="flex flex-wrap gap-2">
      {words.map((word) => (
        <li key={word} className="rounded-full bg-slate-100 px-3 py-1 font-mono text-sm font-medium">
          {word}
        </li>
      ))}
    </ul>
  )
}

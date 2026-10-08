const SAMPLE_WORDS = ['Sol', 'Luna', 'Estrella', 'Planeta', 'Cometa', 'Galaxia', 'Órbita', 'Satélite', 'Nebulosa', 'Año luz']

interface WordListInputProps {
  value: string
  wordCount: number
  onChange: (value: string) => void
}

export function WordListInput({ value, wordCount, onChange }: WordListInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor="word-list" className="font-medium">
          Palabras
        </label>
        <span className="text-xs text-slate-500">{wordCount} en la lista</span>
      </div>

      <textarea
        id="word-list"
        rows={8}
        className="w-full resize-y rounded-lg border border-slate-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder={'Una por línea o separadas por comas\nSol\nLuna\nEstrella'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      <button
        type="button"
        className="text-sm text-blue-600 hover:underline"
        onClick={() => onChange(SAMPLE_WORDS.join('\n'))}
      >
        Cargar ejemplo
      </button>
    </div>
  )
}

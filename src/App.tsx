import { usePuzzleGenerator } from './application/usePuzzleGenerator'

// Versión provisional para probar el hook. En el Paso 7 se reparte en componentes.
function App() {
  const { wordsText, setWordsText, canGenerate, generate, result } = usePuzzleGenerator()

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold text-blue-600">Word Search Generator</h1>

      <textarea
        className="block w-64 h-32 border rounded p-2"
        placeholder="Una palabra por línea"
        value={wordsText}
        onChange={(event) => setWordsText(event.target.value)}
      />
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-40"
        disabled={!canGenerate}
        onClick={generate}
      >
        Generar
      </button>

      {result && (
        <pre className="font-mono text-lg leading-tight">
          {result.puzzle.grid.map((row) => row.join(' ')).join('\n')}
        </pre>
      )}
    </main>
  )
}

export default App

import { usePdfExport } from './application/usePdfExport'
import { usePuzzleGenerator } from './application/usePuzzleGenerator'
import { jsPdfExporter } from './infrastructure/pdf/jsPdfExporter'
import { Card } from './ui/components/Card'
import { ConfigPanel } from './ui/components/ConfigPanel'
import { GenerationWarnings } from './ui/components/GenerationWarnings'
import { PuzzleGrid } from './ui/components/PuzzleGrid'
import { Toolbar } from './ui/components/Toolbar'
import { WordList } from './ui/components/WordList'
import { WordListInput } from './ui/components/WordListInput'

function App() {
  const {
    wordsText,
    setWordsText,
    words,
    settings,
    updateSettings,
    canGenerate,
    generate,
    result,
    showSolution,
    toggleSolution,
  } = usePuzzleGenerator()
  // App es el único sitio que sabe que el PDF se hace con jsPDF: aquí se "enchufa" la implementación.
  const pdf = usePdfExport(jsPdfExporter)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-2xl font-bold">Word Search Generator</h1>
          <p className="text-sm text-slate-500">Crea sopas de letras a partir de tu propia lista de palabras.</p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[20rem_1fr]">
        <aside className="space-y-6">
          <Card title="Configuración">
            <div className="space-y-6">
              <WordListInput
                value={wordsText}
                wordCount={words.length}
                onChange={setWordsText}
              />
              <ConfigPanel settings={settings} onChange={updateSettings} />
              <button
                type="button"
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!canGenerate}
                onClick={generate}
              >
                {result ? 'Generar otra' : 'Generar sopa'}
              </button>
            </div>
          </Card>
        </aside>

        {result ? (
          <div className="space-y-6">
            <GenerationWarnings rejectedWords={result.rejectedWords} unplacedWords={result.unplacedWords} />
            <Toolbar
              showSolution={showSolution}
              onToggleSolution={toggleSolution}
              includeSolutionInPdf={pdf.includeSolution}
              onIncludeSolutionInPdfChange={pdf.setIncludeSolution}
              isExporting={pdf.isExporting}
              exportError={pdf.error}
              onExportPdf={() => pdf.exportPdf(result.puzzle)}
            />
            <Card>
              <PuzzleGrid
                grid={result.puzzle.grid}
                solution={showSolution ? result.puzzle.placements : undefined}
              />
            </Card>
            <Card title={`Palabras a buscar (${result.puzzle.placements.length})`}>
              <WordList placements={result.puzzle.placements} showSolution={showSolution} />
            </Card>
          </div>
        ) : (
          <div className="flex min-h-64 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8 text-center text-slate-500">
            Escribe tus palabras y pulsa <strong className="mx-1">Generar sopa</strong> para ver el resultado.
          </div>
        )}
      </main>
    </div>
  )
}

export default App

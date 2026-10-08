import { usePdfExport } from './application/usePdfExport'
import { usePuzzleGenerator } from './application/usePuzzleGenerator'
import { jsPdfExporter } from './infrastructure/pdf/jsPdfExporter'
import { Card } from './ui/components/Card'
import { ConfigPanel } from './ui/components/ConfigPanel'
import { EmptyState } from './ui/components/EmptyState'
import { Footer } from './ui/components/Footer'
import { GenerationWarnings } from './ui/components/GenerationWarnings'
import { Header } from './ui/components/Header'
import { PuzzleGrid } from './ui/components/PuzzleGrid'
import { Toolbar } from './ui/components/Toolbar'
import { WordList } from './ui/components/WordList'
import { WordListInput } from './ui/components/WordListInput'
import { useTheme } from './ui/hooks/useTheme'
import { SAMPLE_WORDS } from './ui/siteConfig'

function App() {
  const { theme, toggleTheme } = useTheme()
  const generator = usePuzzleGenerator()
  // App es el único sitio que sabe que el PDF se hace con jsPDF: aquí se "enchufa" la implementación.
  const pdf = usePdfExport(jsPdfExporter)
  const { result, settings, showSolution } = generator

  return (
    <div className="flex min-h-dvh flex-col">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto grid w-full max-w-7xl flex-1 items-start gap-6 px-4 py-6 lg:grid-cols-[20rem_1fr]">
        <aside className="lg:sticky lg:top-24">
          <Card title="Configuración">
            <div className="space-y-6">
              <WordListInput
                value={generator.wordsText}
                wordCount={generator.words.length}
                onChange={generator.setWordsText}
                onSubmit={generator.generate}
              />
              <ConfigPanel settings={settings} onChange={generator.updateSettings} />
              <button
                type="button"
                className="w-full rounded-lg bg-brand px-4 py-2.5 font-semibold text-on-brand shadow-sm transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!generator.canGenerate}
                onClick={generator.generate}
              >
                {result ? 'Generar otra' : 'Generar sopa'}
              </button>
            </div>
          </Card>
        </aside>

        {result ? (
          // Cambiar la key en cada generación vuelve a montar el bloque y repite la animación de entrada.
          <div key={generator.generationCount} className="space-y-4 motion-safe:animate-pop-in">
            <GenerationWarnings rejectedWords={result.rejectedWords} unplacedWords={result.unplacedWords} />

            <section className="rounded-xl bg-surface p-4 shadow-sm ring-1 ring-line sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  Tu sopa{' '}
                  <span className="font-mono text-sm font-medium text-muted">
                    {result.puzzle.size}×{result.puzzle.size}
                  </span>
                </h2>
                <Toolbar
                  showSolution={showSolution}
                  onToggleSolution={generator.toggleSolution}
                  includeSolutionInPdf={pdf.includeSolution}
                  onIncludeSolutionInPdfChange={pdf.setIncludeSolution}
                  isExporting={pdf.isExporting}
                  exportError={pdf.error}
                  onExportPdf={() => pdf.exportPdf(result.puzzle)}
                />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1fr_12rem]">
                <PuzzleGrid grid={result.puzzle.grid} solution={showSolution ? result.puzzle.placements : undefined} />
                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">
                    Palabras a buscar ({result.puzzle.placements.length})
                  </h3>
                  <WordList placements={result.puzzle.placements} showSolution={showSolution} />
                </div>
              </div>
            </section>
          </div>
        ) : (
          <EmptyState onLoadSample={() => generator.setWordsText(SAMPLE_WORDS.join('\n'))} />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App

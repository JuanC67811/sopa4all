import type { GState as GStateClass, jsPDF as JsPdf } from 'jspdf'
import type { ExportOptions, PuzzleExporter } from '../../application/PuzzleExporter'
import type { Puzzle } from '../../domain/models'
import { getSolutionLines, solutionHue } from '../../domain/solution'
import { hslToRgb } from './hslToRgb'
import { computeLayout, PAGE, type PdfLayout } from './pdfLayout'

const FILE_NAME = 'sopa-de-letras.pdf'
const MM_TO_PT = 72 / 25.4 // jsPDF mide las fuentes en puntos y la página en mm

/**
 * Dibuja la sopa con texto y líneas vectoriales (no una captura de pantalla),
 * así el PDF queda nítido a cualquier tamaño de impresión.
 */
export async function buildPuzzlePdf(puzzle: Puzzle, { withSolution }: ExportOptions): Promise<JsPdf> {
  // Import dinámico: jsPDF solo se descarga cuando alguien pulsa "Descargar PDF".
  const { jsPDF, GState } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const layout = computeLayout(puzzle.size, puzzle.placements.length)

  drawPage(doc, puzzle, layout, 'Sopa de letras')
  if (withSolution) {
    doc.addPage()
    drawPage(doc, puzzle, layout, 'Solución', GState)
  }
  return doc
}

export const jsPdfExporter: PuzzleExporter = {
  async export(puzzle, options) {
    const doc = await buildPuzzlePdf(puzzle, options)
    doc.save(FILE_NAME)
  },
}

/** Si se pasa GState, la página lleva la solución dibujada. */
function drawPage(doc: JsPdf, puzzle: Puzzle, layout: PdfLayout, title: string, GState?: typeof GStateClass) {
  doc.setTextColor(30)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text(title, PAGE.width / 2, PAGE.margin + 8, { align: 'center' })

  // Las líneas de la solución van primero, para que las letras queden encima.
  if (GState) drawSolutionLines(doc, puzzle, layout, GState)
  drawGrid(doc, puzzle, layout)
  drawWordList(doc, puzzle, layout, Boolean(GState))

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(150)
  doc.text('Generado con Sopa4All', PAGE.width / 2, PAGE.height - 8, { align: 'center' })
}

function drawGrid(doc: JsPdf, puzzle: Puzzle, { gridX, gridY, gridSide, cellSize }: PdfLayout) {
  doc.setDrawColor(200)
  doc.setLineWidth(0.2)
  for (let i = 0; i <= puzzle.size; i++) {
    doc.line(gridX + i * cellSize, gridY, gridX + i * cellSize, gridY + gridSide)
    doc.line(gridX, gridY + i * cellSize, gridX + gridSide, gridY + i * cellSize)
  }

  doc.setFont('courier', 'bold')
  doc.setFontSize(cellSize * MM_TO_PT * 0.55)
  doc.setTextColor(20)
  puzzle.grid.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
      const x = gridX + (colIndex + 0.5) * cellSize
      const y = gridY + (rowIndex + 0.5) * cellSize
      doc.text(letter, x, y, { align: 'center', baseline: 'middle' })
    })
  })
}

function drawSolutionLines(doc: JsPdf, puzzle: Puzzle, layout: PdfLayout, GState: typeof GStateClass) {
  const { gridX, gridY, cellSize } = layout
  const center = (index: number) => (index + 0.5) * cellSize

  doc.saveGraphicsState()
  doc.setGState(new GState({ opacity: 0.4 }))
  doc.setLineCap('round')
  doc.setLineWidth(cellSize * 0.75)
  getSolutionLines(puzzle.placements).forEach(({ from, to }, index) => {
    doc.setDrawColor(...hslToRgb(solutionHue(index), 0.8, 0.55))
    doc.line(gridX + center(from.col), gridY + center(from.row), gridX + center(to.col), gridY + center(to.row))
  })
  doc.restoreGraphicsState()
}

function drawWordList(doc: JsPdf, puzzle: Puzzle, layout: PdfLayout, withColors: boolean) {
  const { wordsY, wordColumns, wordColumnWidth, wordRowHeight } = layout
  // Guardamos el índice original antes de ordenar: es el que decide el color.
  const words = puzzle.placements
    .map((placement, index) => ({ word: placement.word, index }))
    .sort((a, b) => a.word.localeCompare(b.word, 'es'))

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(30)
  words.forEach(({ word, index }, position) => {
    const x = PAGE.margin + (position % wordColumns) * wordColumnWidth
    const y = wordsY + Math.floor(position / wordColumns) * wordRowHeight
    if (withColors) {
      doc.setFillColor(...hslToRgb(solutionHue(index), 0.8, 0.55))
      doc.circle(x + 1.5, y - 1.2, 1.3, 'F')
    }
    doc.text(word, withColors ? x + 5 : x, y)
  })
}

/** Medidas de una hoja A4 en milímetros. */
export const PAGE = { width: 210, height: 297, margin: 15 }

const TITLE_HEIGHT = 20
const GAP = 10
const WORD_COLUMNS = 4
const WORD_ROW_HEIGHT = 7

export interface PdfLayout {
  gridX: number
  gridY: number
  gridSide: number
  cellSize: number
  wordsY: number
  wordColumns: number
  wordColumnWidth: number
  wordRowHeight: number
}

/**
 * Calcula dónde va cada cosa en la página. Es una función pura (solo números),
 * así que se puede testear sin generar ningún PDF.
 * La cuadrícula ocupa todo el ancho posible, pero encoge si la lista de palabras necesita sitio.
 */
export function computeLayout(gridSize: number, wordCount: number): PdfLayout {
  const contentWidth = PAGE.width - 2 * PAGE.margin
  const wordRows = Math.ceil(wordCount / WORD_COLUMNS)
  const gridY = PAGE.margin + TITLE_HEIGHT
  const heightLeftForGrid = PAGE.height - PAGE.margin - gridY - GAP - wordRows * WORD_ROW_HEIGHT
  const gridSide = Math.min(contentWidth, heightLeftForGrid)

  return {
    gridX: (PAGE.width - gridSide) / 2,
    gridY,
    gridSide,
    cellSize: gridSide / gridSize,
    wordsY: gridY + gridSide + GAP,
    wordColumns: WORD_COLUMNS,
    wordColumnWidth: contentWidth / WORD_COLUMNS,
    wordRowHeight: WORD_ROW_HEIGHT,
  }
}

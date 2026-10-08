import type { Placement } from '../../domain/models'
import { getSolutionLines } from '../../domain/solution'
import { solutionColor } from '../solutionColors'

interface PuzzleGridProps {
  grid: string[][]
  /** Si se pasa, se dibuja la solución encima de las letras. */
  solution?: Placement[]
}

export function PuzzleGrid({ grid, solution }: PuzzleGridProps) {
  const size = grid.length

  return (
    // "@container" permite medir el ancho disponible: la letra crece o encoge con la cuadrícula.
    <div className="@container relative mx-auto w-full max-w-2xl">
      <div
        role="grid"
        aria-label="Sopa de letras"
        className="grid border-l border-t border-slate-300 bg-white font-mono font-semibold select-none"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          fontSize: `${55 / size}cqw`, // cqw = 1% del ancho del contenedor
        }}
      >
        {grid.map((row, rowIndex) => (
          // "contents" hace que la fila no ocupe espacio: sus celdas van directo al CSS grid.
          <div role="row" key={rowIndex} className="contents">
            {row.map((letter, colIndex) => (
              <div
                role="gridcell"
                key={colIndex}
                className="flex aspect-square items-center justify-center border-r border-b border-slate-300"
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      {solution && <SolutionOverlay size={size} placements={solution} />}
    </div>
  )
}

/**
 * Un SVG del mismo tamaño que la cuadrícula. Con viewBox "0 0 size size",
 * cada celda mide 1x1 y su centro está en (col + 0.5, row + 0.5).
 */
function SolutionOverlay({ size, placements }: { size: number; placements: Placement[] }) {
  return (
    <svg
      aria-label="Solución"
      viewBox={`0 0 ${size} ${size}`}
      // multiply: el color se mezcla con el fondo y las letras siguen viéndose negras.
      className="pointer-events-none absolute inset-0 size-full mix-blend-multiply"
    >
      {getSolutionLines(placements).map(({ word, from, to }, index) => (
        <line
          key={word}
          x1={from.col + 0.5}
          y1={from.row + 0.5}
          x2={to.col + 0.5}
          y2={to.row + 0.5}
          stroke={solutionColor(index)}
          strokeWidth={0.75}
          strokeLinecap="round"
          strokeOpacity={0.45}
        >
          <title>{word}</title>
        </line>
      ))}
    </svg>
  )
}

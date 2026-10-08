interface PuzzleGridProps {
  grid: string[][]
}

export function PuzzleGrid({ grid }: PuzzleGridProps) {
  const size = grid.length

  return (
    // "@container" permite medir el ancho disponible: la letra crece o encoge con la cuadrícula.
    <div className="@container mx-auto w-full max-w-2xl">
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
    </div>
  )
}

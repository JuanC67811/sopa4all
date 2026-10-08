const CELL_POSITIONS = [6.5, 13.5, 20.5]

/** Una mini sopa de 3x3 con una palabra "encontrada" en diagonal. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="8" className="fill-brand" />
      <g className="fill-on-brand" fillOpacity={0.35}>
        {CELL_POSITIONS.flatMap((y) =>
          CELL_POSITIONS.map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={5} height={5} rx={1.2} />),
        )}
      </g>
      <line x1={9} y1={23} x2={23} y2={9} stroke="#fbbf24" strokeWidth={5} strokeLinecap="round" />
    </svg>
  )
}

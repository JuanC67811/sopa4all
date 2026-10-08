import { ALL_DIRECTIONS, MAX_SIZE, MIN_SIZE, type Direction, type PuzzleSettings } from '../../domain/models'

const DIRECTION_LABELS: Record<Direction, string> = {
  horizontal: 'Horizontal →',
  vertical: 'Vertical ↓',
  diagonalDown: 'Diagonal ↘︎', // ︎: dibujar como texto, no como emoji
  diagonalUp: 'Diagonal ↗',
}

interface ConfigPanelProps {
  settings: PuzzleSettings
  onChange: (changes: Partial<PuzzleSettings>) => void
}

export function ConfigPanel({ settings, onChange }: ConfigPanelProps) {
  const toggleDirection = (direction: Direction) => {
    const enabled = settings.directions.includes(direction)
    // Filtramos sobre ALL_DIRECTIONS para mantener siempre el mismo orden.
    const directions = ALL_DIRECTIONS.filter((d) =>
      d === direction ? !enabled : settings.directions.includes(d),
    )
    onChange({ directions })
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="grid-size" className="flex justify-between font-medium">
          Tamaño
          <span className="font-mono text-sm text-muted">
            {settings.size} × {settings.size}
          </span>
        </label>
        <input
          id="grid-size"
          type="range"
          min={MIN_SIZE}
          max={MAX_SIZE}
          value={settings.size}
          onChange={(event) => onChange({ size: Number(event.target.value) })}
          className="w-full accent-brand"
        />
      </div>

      <fieldset>
        <legend className="mb-2 font-medium">Direcciones</legend>
        <div className="grid grid-cols-2 gap-2">
          {ALL_DIRECTIONS.map((direction) => (
            <label
              key={direction}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm ring-1 ring-line transition-colors has-checked:bg-brand-soft has-checked:ring-brand/40"
            >
              <input
                type="checkbox"
                className="size-4 accent-brand"
                checked={settings.directions.includes(direction)}
                onChange={() => toggleDirection(direction)}
              />
              {DIRECTION_LABELS[direction]}
            </label>
          ))}
        </div>
        {settings.directions.length === 0 && (
          <p className="mt-2 text-sm text-danger">Elige al menos una dirección.</p>
        )}
      </fieldset>

      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="size-4 accent-brand"
          checked={settings.allowReversed}
          onChange={(event) => onChange({ allowReversed: event.target.checked })}
        />
        Permitir palabras al revés <span className="text-muted">(más difícil)</span>
      </label>
    </div>
  )
}

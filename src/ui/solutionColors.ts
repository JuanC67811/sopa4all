import { solutionHue } from '../domain/solution'

/** Color CSS de la línea de cada palabra de la solución. */
export function solutionColor(index: number): string {
  return `hsl(${solutionHue(index)} 80% 55%)`
}

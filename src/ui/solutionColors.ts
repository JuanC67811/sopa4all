/**
 * Un color distinto para cada palabra de la solución.
 * Saltar 137,5° (el "ángulo de oro") por la rueda de color reparte bien los tonos
 * aunque haya muchas palabras: dos colores seguidos nunca se parecen.
 */
export function solutionColor(index: number): string {
  return `hsl(${(index * 137.5) % 360} 80% 55%)`
}

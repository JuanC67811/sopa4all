/** Devuelve un número en [0, 1). Math.random cumple esta firma. */
export type RandomFn = () => number

/**
 * Baraja una copia del array con el algoritmo Fisher-Yates:
 * cada orden posible tiene la misma probabilidad. No modifica el original.
 */
export function shuffle<T>(items: readonly T[], random: RandomFn): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

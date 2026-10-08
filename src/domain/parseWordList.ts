/**
 * Convierte el texto que escribe el usuario en una lista de palabras.
 * Acepta una por línea o separadas por comas / punto y coma.
 */
export function parseWordList(text: string): string[] {
  return text
    .split(/[\n,;]+/)
    .map((word) => word.trim())
    .filter((word) => word !== '')
}

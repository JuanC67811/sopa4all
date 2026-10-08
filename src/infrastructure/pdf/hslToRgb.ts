/** jsPDF no entiende colores HSL: los convertimos a RGB (0-255). s y l van de 0 a 1. */
export function hslToRgb(hue: number, saturation: number, lightness: number): [number, number, number] {
  const k = (n: number) => (n + hue / 30) % 12
  const a = saturation * Math.min(lightness, 1 - lightness)
  const channel = (n: number) => lightness - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))
  return [channel(0), channel(8), channel(4)].map((value) => Math.round(value * 255)) as [number, number, number]
}

import { describe, expect, it } from 'vitest'
import { countOccurrences } from '../countOccurrences'

const toGrid = (rows: string[]) => rows.map((row) => [...row])

describe('countOccurrences', () => {
  const grid = toGrid([
    'SOLXX',
    'XXXXX',
    'XXLOS', // SOL al revés
    'XXXXX',
    'XXXXX',
  ])

  it('encuentra la palabra en ambos sentidos', () => {
    expect(countOccurrences(grid, 'SOL')).toBe(2)
  })

  it('devuelve 0 si la palabra no está', () => {
    expect(countOccurrences(grid, 'MAR')).toBe(0)
  })

  it('encuentra palabras en diagonal', () => {
    const diagonal = toGrid(['MXX', 'XAX', 'XXR'])
    expect(countOccurrences(diagonal, 'MAR')).toBe(1)
  })

  it('cuenta un palíndromo una sola vez', () => {
    expect(countOccurrences(toGrid(['OSO', 'XXX', 'XXX']), 'OSO')).toBe(1)
  })
})

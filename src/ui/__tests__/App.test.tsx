// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../../App'

afterEach(cleanup)

const typeWords = (text: string) =>
  fireEvent.change(screen.getByLabelText('Palabras'), { target: { value: text } })

const clickGenerate = () => fireEvent.click(screen.getByRole('button', { name: /generar/i }))

describe('App', () => {
  it('desactiva el botón mientras no hay palabras', () => {
    render(<App />)
    expect(screen.getByRole<HTMLButtonElement>('button', { name: /generar/i }).disabled).toBe(true)
  })

  it('genera una sopa de 15x15 con la lista de palabras', () => {
    render(<App />)
    typeWords('sol\nluna\nmar')
    clickGenerate()

    expect(screen.getAllByRole('gridcell')).toHaveLength(15 * 15)
    const list = screen.getByRole('list', { name: 'Palabras a buscar' })
    expect(within(list).getAllByRole('listitem').map((li) => li.textContent)).toEqual(['LUNA', 'MAR', 'SOL'])
  })

  it('respeta el tamaño elegido', () => {
    render(<App />)
    typeWords('sol')
    fireEvent.change(screen.getByLabelText(/tamaño/i), { target: { value: '8' } })
    clickGenerate()
    expect(screen.getAllByRole('gridcell')).toHaveLength(8 * 8)
  })

  it('dibuja una línea por palabra al mostrar la solución', () => {
    render(<App />)
    typeWords('sol\nluna\nmar')
    clickGenerate()
    expect(screen.queryByLabelText('Solución')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar solución' }))
    const lines = screen.getByLabelText('Solución').querySelectorAll('line')
    expect([...lines].map((line) => line.textContent).sort()).toEqual(['LUNA', 'MAR', 'SOL'])

    fireEvent.click(screen.getByRole('button', { name: 'Ocultar solución' }))
    expect(screen.queryByLabelText('Solución')).toBeNull()
  })

  it('genera con Ctrl + Enter desde la caja de palabras', () => {
    render(<App />)
    typeWords('sol')
    fireEvent.keyDown(screen.getByLabelText('Palabras'), { key: 'Enter', ctrlKey: true })
    expect(screen.getAllByRole('gridcell')).toHaveLength(15 * 15)
  })

  it('el estado vacío carga palabras de ejemplo', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /palabras de ejemplo/i }))
    expect(screen.getByLabelText<HTMLTextAreaElement>('Palabras').value).toContain('Estrella')
  })

  it('cambia entre modo claro y oscuro', () => {
    render(<App />)
    const html = document.documentElement
    const startedDark = html.classList.contains('dark')

    fireEvent.click(screen.getByRole('button', { name: /activar modo/i }))
    expect(html.classList.contains('dark')).toBe(!startedDark)

    fireEvent.click(screen.getByRole('button', { name: /activar modo/i }))
    expect(html.classList.contains('dark')).toBe(startedDark)
  })

  it('avisa de las palabras descartadas', () => {
    render(<App />)
    typeWords('sol\nsol\nr2d2')
    clickGenerate()
    expect(screen.getByRole('status').textContent).toContain('está repetida')
    expect(screen.getByRole('status').textContent).toContain('no son letras')
  })
})

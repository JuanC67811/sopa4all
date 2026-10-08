import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
}

/** Contenedor con fondo y borde suave, para agrupar secciones. */
export function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-xl bg-surface p-5 shadow-sm ring-1 ring-line">
      {title && <h2 className="mb-4 text-xs font-semibold tracking-wider text-muted uppercase">{title}</h2>}
      {children}
    </section>
  )
}

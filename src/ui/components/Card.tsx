import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
}

/** Contenedor blanco con borde suave, para agrupar secciones. */
export function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      {title && <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>}
      {children}
    </section>
  )
}

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // GitHub Pages sirve la app en https://<usuario>.github.io/sopa4all/, no en la raíz.
  base: command === 'build' ? '/sopa4all/' : '/',
}))

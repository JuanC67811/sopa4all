import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Cloudflare sirve la app en la raíz ("/"). GitHub Pages la sirve en /sopa4all/,
  // así que su workflow define BASE_PATH=/sopa4all/ al compilar.
  base: process.env.BASE_PATH ?? '/',
})

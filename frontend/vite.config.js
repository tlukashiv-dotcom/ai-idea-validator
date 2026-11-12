import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE потрібен для GitHub Pages, де сайт живе за адресою /ai-idea-validator/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})

import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    // Local dev: forward /api to the Fastify backend (cd backend && npm run dev)
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})

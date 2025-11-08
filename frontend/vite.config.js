import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs'
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://e4797b89-4139-4d2d-942d-c40a6f0aa3e4.hanko.io',
        changeOrigin: true,
        secure: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  }
})


import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    define: {
      global: {},
    },
    environment: 'jsdom',
    globals: true,
    include: ['**/*.test.{js,jsx}'],
    exclude: ['node_modules'],
    setupFiles: ['src/tests/setupTest.js'],
  },
})

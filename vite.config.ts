import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'my-library.[ext][hash].js',
    },
  },
})

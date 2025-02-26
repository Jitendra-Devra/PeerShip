import { defineConfig } from 'vite'
import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
      ],
    },
  },
})
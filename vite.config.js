import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      'process.env.GOOGLE_CLIENT_ID': JSON.stringify("506432432480-sphbb1j9kogcnbpl7duq9tild08239s5.apps.googleusercontent.com"),
      'process.env.VITE_API_URL': JSON.stringify("http://localhost:5000"),
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
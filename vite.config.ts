import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/InternSutra/', // <-- Add this line (must match your exact repo name with slashes)
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // base path যুক্ত করা হয়েছে যাতে GitHub Pages-এ ফাইলগুলো ঠিকঠাক লোড হয়
  base: '/Rise-at-Seven/', 
  plugins: [react(), tailwindcss()],
})
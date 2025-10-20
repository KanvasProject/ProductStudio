
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // PENTING: Ubah 'NAMA-REPO-ANDA' menjadi nama repositori GitHub Anda.
  // Contoh: jika URL repo Anda adalah https://github.com/user/my-awesome-app,
  // maka base harusnya '/my-awesome-app/'.
  base: '/NAMA-REPO-ANDA/', 
  build: {
    outDir: 'dist'
  }
})

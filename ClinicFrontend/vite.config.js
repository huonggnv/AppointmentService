import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true // Cho phép truy cập qua Radmin VPN (listen on all network interfaces)
  }
})

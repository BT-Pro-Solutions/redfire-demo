import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  base: command === 'build' ? '/redfire-demo/' : '/'
}))


// vite.config.js (Vue)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../API/ClientApp/dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@mod1': path.resolve(__dirname, './ SIPRED-MOD001/src'),
      '@mod2': path.resolve(__dirname, './ SIPRED-MOD002/src'),
      '@ue': path.resolve(__dirname, './ UnidadEmpleo/src'),
      
     
    }
  }
})
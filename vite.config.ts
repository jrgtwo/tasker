import fs from 'fs';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'  
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return { 
    envDir: './env/',
    define: {
      global: "window",
    },
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      allowedHosts: [env.VITE_ALLOWED_HOST],
      https: {
        key: fs.readFileSync(env.VITE_SSL_KEY),
        cert: fs.readFileSync(env.VITE_SSL_CERT)
      }
    }
  }
})

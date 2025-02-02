import fs from 'fs';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'  

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env)
  return { 
    envDir: './env/',
    define: {
      global: "window",
    },
    plugins: [react()],
    server: {
      allowedHosts: [env.VITE_ALLOWED_HOST],
      https: {
        key: fs.readFileSync(env.VITE_SSL_KEY),
        cert: fs.readFileSync(env.VITE_SSL_CERT)
      }
    }
  }
})

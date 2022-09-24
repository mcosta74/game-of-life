import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@wailsjs": resolve(__dirname, "./wailsjs"),
      "@assets": resolve(__dirname, "./src/assets"),
    },
  },
});

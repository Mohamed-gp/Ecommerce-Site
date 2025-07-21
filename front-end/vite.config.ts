import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
// import eslint from "vite-plugin-eslint";

dotenv.config({ path: ".env" });

export default defineConfig({
  plugins: [
    react(),
    // eslint()
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['framer-motion', 'react-hot-toast', 'sweetalert2'],
          icons: ['react-icons']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      protocol: process.env.VITE_ENV == "production" ? "wss" : "ws", // wss not ws for sucurity(secure some browsers) gonna complain
      host:
        process.env.VITE_ENV == "development"
          ? "localhost"
          : "swiftbuy.production-server.tech",
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 4173,
    host: true
  },
  css: {
    devSourcemap: process.env.VITE_ENV != "development",
  },
  define: {
    'process.env': {}
  }
});

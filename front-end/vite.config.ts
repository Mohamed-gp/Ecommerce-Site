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
  server: {
    port: 5000,
    host: true,
    hmr: {
      protocol: process.env.VITE_ENV == "production" ? "wss" : "ws", // wss not ws for sucurity(secure some browsers) gonna complain
      host:
        process.env.VITE_ENV == "development"
          ? "localhost"
          : "swiftbuy.production-server.tech",
    },
  },

  css: {
    devSourcemap: process.env.VITE_ENV != "development",
  },
});

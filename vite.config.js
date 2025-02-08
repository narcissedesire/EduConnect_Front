import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "0.0.0.0",
    // port: 3000,
    proxy: {
      "/api": {
        target: "https://educonnect-back.onrender.com",
        // target: "http://127.0.0.1:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // allowedHosts: ["educonnect-back.onrender.com", "localhost"],
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:5000",
        // target: "https://educonnect-back.onrender.com",
        target: "https://educonnect-front.pages.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
  },
});

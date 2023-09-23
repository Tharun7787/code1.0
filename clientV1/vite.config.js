import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Your backend server URL
        changeOrigin: true,
        secure: false, // Set this to true if your backend server uses HTTPS
        pathRewrite: { "^/api": "" },
      },
    },
  },
});

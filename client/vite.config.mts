import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || "http://127.0.0.1:5000";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: apiProxyTarget,
        changeOrigin: true
      }
    }
  }
});


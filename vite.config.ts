import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900, // only the lazy 3D chunk exceeds 500 kB
    rollupOptions: {
      output: {
        // The 3D stack (three / R3F) is only reachable through React.lazy(), so Rollup
        // keeps it in the lazy HeroScene chunk automatically. Only pin React here.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom|@remix-run)\//.test(id)) {
            return "react-vendor";
          }
        },
      },
    },
  },
});

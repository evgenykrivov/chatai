import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react" // https://vitejs.dev/config/

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": "/src/",
    },
  },
  envDir: "../",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})

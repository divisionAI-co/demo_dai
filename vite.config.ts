/// <reference types="vitest/config" />
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Lets `import … from "/vite.svg"` resolve during `vite build` (public/ is not importable as a module).
      "/vite.svg": path.resolve(__dirname, "src/assets/vite.svg"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    passWithNoTests: false,
  },
});

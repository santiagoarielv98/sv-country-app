import { defineConfig } from "vitest/config";

import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom", // Necesario para pruebas con DOM
    globals: true, // Permite usar expect sin importarlo
    setupFiles: "./setupTests.ts", // Opcional: configuración inicial
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

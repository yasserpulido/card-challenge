import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      provider: "v8", // usa @vitest/coverage-v8
      reportsDirectory: "./coverage",
      reporter: ["text", "json-summary", "html"],
      exclude: [
        "src/main.tsx",
        "src/App.tsx",
        "vite.config.ts",
        "vitest.config.ts",
        "src/types/**",
        "src/context/**",
      ],
    },
  },
});

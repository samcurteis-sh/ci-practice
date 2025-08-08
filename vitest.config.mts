import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: [
      "__tests__/**/*.test.tsx",
      "__tests__/*.test.tsx",
      "__tests__/**/*.test.ts",
      "__tests__/*.test.ts",
      "**/*.test.tsx",
    ],
    exclude: [
      "node_modules",
      "dist",
    ],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "json-summary", "json"],
      reportsDirectory: "./coverage",
      reportOnFailure: true,
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/*.config.mjs",
        "__mocks__/**",
        "**/**/next.config.ts",
        "app/layout.tsx"
      ],
    },
  },
});

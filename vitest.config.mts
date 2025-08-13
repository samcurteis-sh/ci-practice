import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

const appTarget = process.env.COVERAGE_SCOPE || "all";

let includePatterns: string[];
let testDir: string;

switch (appTarget) {
  case "app1":
    includePatterns = ["apps/app1/**/*.{ts,tsx,js,jsx}"];
    testDir = "apps/app1";
    break;
  case "app2":
    includePatterns = ["apps/app2/**/*.{ts,tsx,js,jsx}"];
    testDir = "apps/app2";
    break;
  default:
    includePatterns = ["**/*.{ts,tsx,js,jsx}"];
    testDir = ".";
}

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    dir: testDir,
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
      "e2e"
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
      include: includePatterns,
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/*.config.mjs",
        "__mocks__/**",
        "**/**/next.config.ts",
        "**/app/layout.tsx",
        "e2e/**",
        "playwright-report",
        "playwright.config.ts"
      ],
    },
  },
});

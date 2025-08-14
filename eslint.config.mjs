import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "**/.next/**", 
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
    ],
  },
  {
    files: ["apps/app1/**/*.{js,jsx,ts,tsx}", "apps/app2/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./apps/app1/tsconfig.json", "./apps/app2/tsconfig.json"],
      },
    },
  },
];

export default config

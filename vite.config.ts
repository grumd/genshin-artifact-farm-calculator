/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "/genshin-artifact-farm-calculator/",
  plugins: [react(), visualizer()],
  test: { globals: true, setupFiles: ["@vitest/web-worker"] },
});

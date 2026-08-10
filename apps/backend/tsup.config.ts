import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  entry: ["src/index.ts"],
  splitting: true,
  sourcemap: true,
  format: ["esm", "cjs"],
  clean: true,
  minify: !opts.watch,
}));

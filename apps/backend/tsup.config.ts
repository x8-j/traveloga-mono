import { defineConfig } from "tsup";

export default defineConfig((opts) => ({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: true,
  format: ["esm", "cjs"],
  clean: true,
  minify: !opts.watch,
}));

import { build } from "esbuild";
import { startDevServer } from "@web/dev-server";

await build({
  entryPoints: ["index.tsx"],
  outfile: "dist/main.js",
  bundle: true,
  sourcemap: true,
  loader: {
    ".ts": "ts",
    ".tsx": "tsx"
  },
  define: {
    "process.env.NODE_ENV": "\"development\""
  }
});

startDevServer({
  config: {
    rootDir: ".",
    port: 3000,
    watch: true,
    open: true
  }
});

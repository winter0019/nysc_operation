import esbuild from "esbuild";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start esbuild in watch mode
esbuild.build({
  entryPoints: ["index.tsx"],
  bundle: true,
  outfile: "dist/main.js",
  loader: {
    ".ts": "ts",
    ".tsx": "tsx"
  },
  define: {
    "process.env.NODE_ENV": "\"development\""
  },
  watch: {
    onRebuild(error) {
      if (error) console.error("❌ Rebuild failed:", error);
      else console.log("✔ Rebuild succeeded");
    }
  }
}).then(() => {
  console.log("✔ Initial build complete");
});

// Start express static file server
const app = express();

// Serve root project folder
app.use(express.static("."));

// Always serve index.html
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Dev server running at http://localhost:${PORT}`)
);

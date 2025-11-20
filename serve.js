import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { generateQueryDraft } from "./services/geminiService.js";

const app = express();
app.use(cors());
app.use(express.json());

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API endpoint
app.post("/api/generate", async (req, res) => {
  const { offense, corpMemberName, stateCode, ppa, lgaName, lgiName } = req.body;

  try {
    const draft = await generateQueryDraft(
      offense,
      corpMemberName,
      stateCode,
      ppa,
      lgaName,
      lgiName
    );
    res.json({ draft });
  } catch (err) {
    console.error("AI generation error:", err);
    res.status(500).json({ error: "Failed to generate draft" });
  }
});

// Serve built frontend
app.use(express.static(path.join(__dirname, "dist")));

// Always return index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

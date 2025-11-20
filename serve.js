import express from "express";
import cors from "cors";
import { generateQueryDraft } from "./services/geminiService.js";

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint for AI query draft
app.post("/api/generate", async (req, res) => {
  const { offense, corpMemberName, stateCode, ppa, lgaName, lgiName } = req.body;

  try {
    const draft = await generateQueryDraft(offense, corpMemberName, stateCode, ppa, lgaName, lgiName);
    res.json({ draft });
  } catch (err) {
    console.error("AI generation error:", err);
    res.status(500).json({ error: "Failed to generate draft" });
  }
});

// Serve static frontend
app.use(express.static("dist"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// services/geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// GEMINI_API_KEY injected at build time
const GEMINI_KEY: string =
  typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

if (!GEMINI_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is missing! Set it in environment variables.");
}

// Initialize client
const ai = new GoogleGenerativeAI({ apiKey: GEMINI_KEY });

export const generateQueryDraft = async (
  offense: string,
  corpMemberName: string,
  stateCode: string,
  ppa: string,
  lgaName: string,
  lgiName: string
): Promise<string> => {
  try {
    const prompt = `
      Draft a formal NYSC query letter for ${corpMemberName} in ${lgaName} 
      regarding offense: ${offense}, posted at ${ppa}, ${stateCode}.
    `;

    const response = await ai.chat.completions.create({
      model: "gemini-2.5-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating query draft:", error);
    if (error instanceof Error) return `AI error: ${error.message}`;
    return "Unknown error generating draft.";
  }
};

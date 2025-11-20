// services/geminiService.ts
import { GoogleGenAI } from "@google/genai";

// Safely read GEMINI_API_KEY injected by esbuild
const GEMINI_KEY =
  typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

if (!GEMINI_KEY) {
  console.warn(
    "⚠️ GEMINI_API_KEY is missing! Make sure it is set in your environment variables."
  );
}

const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

export const generateQueryDraft = async (
  offense: string,
  corpMemberName: string,
  stateCode: string,
  ppa: string,
  lgaName: string,
  lgiName: string
): Promise<string> => {
  try {
    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const randomRefNum = Math.floor(Math.random() * 899) + 100;

    const prompt = `
      You are an expert NYSC Local Government Inspector in ${lgaName}.
      Draft a formal query letter for ${corpMemberName}, regarding ${offense}.
      Include the state code (${stateCode}), PPA (${ppa}), LGI (${lgiName}), 
      date (${currentDate}), and reference number (${randomRefNum}). 
      Use proper salutations and formatting.
    `;

    // Correct method to call the model
    const response = await ai.generate({
      model: "gemini-2.5-flash",
      input: prompt,
    });

    return response.output_text;
  } catch (error) {
    console.error("Error generating query draft:", error);
    return error instanceof Error
      ? `Error: ${error.message}`
      : "Unknown error occurred";
  }
};

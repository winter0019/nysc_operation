// services/geminiService.ts
import { GoogleGenAI } from "@google/genai";

// GEMINI_API_KEY injected by esbuild at build time
const GEMINI_KEY: string =
  typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

if (!GEMINI_KEY) {
  console.warn(
    "⚠️ GEMINI_API_KEY is missing! Make sure it is set in your environment."
  );
}

export const geminiClient = new GoogleGenAI({ apiKey: GEMINI_KEY });

export const generateQueryDraft = async (
  offense: string,
  corpMemberName: string,
  stateCode: string,
  ppa: string,
  lgaName: string,
  lgiName: string
): Promise<string> => {
  try {
    if (!GEMINI_KEY) throw new Error("API key is missing.");

    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const randomRefNum = Math.floor(Math.random() * 899) + 100;

    const prompt = `
      You are an expert NYSC Local Government Inspector in ${lgaName}.
      Draft a formal query letter for ${corpMemberName}, regarding the offense: ${offense}.
      Include date (${currentDate}), reference number (${randomRefNum}), salutations, and proper formatting.
    `;

    const response = await geminiClient.models.generate({
      model: "gemini-2.5-flash",
      input: prompt,
    });

    return response.text(); // .text() gives the AI response string
  } catch (error) {
    console.error("Error generating query draft:", error);
    return error instanceof Error
      ? `Error: ${error.message}`
      : "An unknown error occurred.";
  }
};

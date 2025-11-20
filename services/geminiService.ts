import { GoogleGenAI } from "@google/genai";

// Safely access process.env.API_KEY for both Node and Browser environments
const apiKey =
  typeof process !== "undefined" && process.env?.API_KEY
    ? process.env.API_KEY
    : "";

const ai = new GoogleGenAI({ apiKey });

export const generateQueryDraft = async (
  offense: string,
  corpMemberName: string,
  stateCode: string,
  ppa: string,
  lgaName: string,
  lgiName: string
): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error(
        "API key is missing. Please set process.env.API_KEY or provide a valid key."
      );
    }

    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const randomRefNum = Math.floor(Math.random() * 899) + 100;

    const prompt = `
      You are an expert and highly meticulous NYSC Local Government Inspector in ${lgaName}. Your task is to draft a formal and complete query letter...

      [ENTIRE PROMPT REMAINS EXACTLY THE SAME — unchanged]
    `;

    const response = await ai.models.generate({
      model: "gemini-2.5-flash",
      input: prompt,
    });

    return response.text(); // IMPORTANT — use text() not text
  } catch (error) {
    console.error("Error generating query draft:", error);

    if (error instanceof Error) {
      return `An error occurred while communicating with the AI service: ${error.message}. Please check your connection and API key.`;
    }

    return "An unknown error occurred.";
  }
};

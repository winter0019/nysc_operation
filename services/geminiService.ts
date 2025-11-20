import { GoogleGenerativeAI } from "@google/generative-ai";

// Safely access process.env.API_KEY for both Node and Browser environments
const apiKey =
  typeof process !== "undefined" && process.env?.API_KEY
    ? process.env.API_KEY
    : "";

if (!apiKey) {
  console.warn(
    "⚠️ API KEY is missing! Make sure API_KEY is set in Render environment variables."
  );
}

// Create Gemini client
const ai = new GoogleGenerativeAI(apiKey);

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

    // ---- Correct Model Call for the new SDK ----
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    // Correct way to access text output
    return result.response.text();
  } catch (error: any) {
    console.error("Error generating query draft:", error);

    return `An error occurred while communicating with the AI service: ${
      error?.message || error
    }. Please check your connection and API key.`;
  }
};

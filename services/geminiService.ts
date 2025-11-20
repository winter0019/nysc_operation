import { GoogleGenerativeAI } from "@google/generative-ai";

// Safely read API key (works in browser-builds via esbuild define)
const apiKey =
  typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

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
      throw new Error("API key is missing. Please set GEMINI_API_KEY.");
    }

    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const randomRefNum = Math.floor(Math.random() * 899) + 100;

    const prompt = `
      You are an expert and highly meticulous NYSC Local Government Inspector in ${lgaName}.
      Your task is to draft a formal and complete query letter...

      [same prompt as before]
    `;

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error generating query draft:", error);

    if (error instanceof Error) {
      return `An error occurred while communicating with the AI service: ${error.message}. Please check your connection and API key.`;
    }

    return "An unknown error occurred.";
  }
};

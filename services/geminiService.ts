import { GoogleGenerativeAI } from "@google/generative-ai";

// Safely access GEMINI_API_KEY injected by esbuild at build time
const apiKey = typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

if (!apiKey) {
  console.warn(
    "⚠️ GEMINI_API_KEY is missing! Make sure it is set in your environment."
  );
}

// Initialize the Google Generative AI client
const ai = new GoogleGenerativeAI({ apiKey });

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
      Your task is to draft a formal and complete query letter for ${corpMemberName}, 
      related to the offense: ${offense}, posted in state ${stateCode} at ${ppa}.
      Include proper formatting, salutations, date (${currentDate}), and reference number (${randomRefNum}).
    `;

    // Use the proper generative model
    const model = ai.model("gemini-2.5-flash");
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

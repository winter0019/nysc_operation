import { GoogleGenerativeAI } from "@google/generative-ai";

<<<<<<< HEAD
// Safely access GEMINI_API_KEY injected by esbuild at build time
const apiKey =
  typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

if (!apiKey) {
  console.warn(
    "⚠️ GEMINI_API_KEY is missing! Make sure it is set in your environment."
  );
}

const ai = new GoogleGenerativeAI({ apiKey });
=======
// Safely read API key (works in browser-builds via esbuild define)
const apiKey = typeof GEMINI_API_KEY !== "undefined" ? GEMINI_API_KEY : "";

if (!apiKey) {
  console.warn("⚠️ GEMINI_API_KEY is missing! Make sure it is set in environment variables.");
}

// Initialize client
const ai = new GoogleGenAI({ apiKey });
>>>>>>> f9e64866bf0756201ceb012d07f29530f2296ed7

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
<<<<<<< HEAD
      throw new Error(
        "API key is missing. Please set GEMINI_API_KEY."
      );
=======
      throw new Error("API key is missing. Please set GEMINI_API_KEY.");
>>>>>>> f9e64866bf0756201ceb012d07f29530f2296ed7
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

<<<<<<< HEAD
    // Use the proper API for generating content
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    return result.response.text;
=======
    // Use the generative model
    const model = ai.model("gemini-2.5-flash");

    const result = await model.generateContent(prompt);

    return result.response.text();
>>>>>>> f9e64866bf0756201ceb012d07f29530f2296ed7
  } catch (error) {
    console.error("Error generating query draft:", error);

    if (error instanceof Error) {
      return `An error occurred while communicating with the AI service: ${error.message}. Please check your connection and API key.`;
    }

    return "An unknown error occurred.";
  }
};

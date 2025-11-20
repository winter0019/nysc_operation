import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ GEMINI_API_KEY missing. Set it in environment variables!");
}

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
    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const randomRefNum = Math.floor(Math.random() * 899) + 100;

    const prompt = `
      You are an expert NYSC Local Government Inspector in ${lgaName}.
      Draft a formal query letter for ${corpMemberName}, offense: ${offense},
      posted in state ${stateCode} at ${ppa}.
      Include proper formatting, salutations, date (${currentDate}), reference (${randomRefNum}).
    `;

    const response = await ai.models.generate({
      model: "gemini-2.5-flash",
      input: prompt,
    });

    return response.output[0].content[0].text || "";
  } catch (err) {
    console.error(err);
    throw new Error("AI generation failed");
  }
};

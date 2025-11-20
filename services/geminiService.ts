import { GoogleGenAI } from "@google/genai";

// GEMINI_API_KEY injected by esbuild
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Generate text
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
      model: "gemini-2.5-chat", // or "gemini-2.5-flash" for text
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    });

    // The text from the first message returned
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating query draft:", error);
    if (error instanceof Error) return `AI error: ${error.message}`;
    return "Unknown error generating draft.";
  }
};

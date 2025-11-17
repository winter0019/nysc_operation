import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateQueryDraft = async (
  offense: string,
  corpMemberName: string,
  stateCode: string,
  ppa: string,
  lgaName: string,
  lgiName: string,
): Promise<string> => {
  try {
    const currentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    const randomRefNum = Math.floor(Math.random() * 899) + 100;

    const prompt = `
      You are an expert and highly meticulous NYSC Local Government Inspector in ${lgaName}. Your task is to draft a formal and complete query letter to a corps member based on an offense. You must use the provided NYSC Bye-Laws (Revised 2011) to cite the *exact* provision that was violated and the *exact* penalty.

      **Corps Member Details:**
      - Name: ${corpMemberName}
      - State Code: ${stateCode}
      - PPA: ${ppa}
      - Offense: "${offense}"
      - LGI Name: ${lgiName}

      **NYSC Bye-Laws (Revised 2011) - Relevant Sections with Penalties:**

      ---
      **III. DURING THE PERIOD OF PRIMARY ASSIGNMENT**
      20. Not refuse posting to primary assignment.
          - Penalty: Any member who refuses to accept posting to primary assignment shall forfeit the allowance for the number of months out of work and also serve an extension double the number of months out of work with half pay.
      21. Not be late to report at duty station.
          - Penalty: Any member who reports late at duty station shall be tried by the Corps Disciplinary Committee and if found guilty, be liable to extension of service on half pay double the period he is late to station.
      23. Not induce rejection of posting.
          - Penalty: Any member who induces the rejection of his posting shall be liable on conviction of extension of service for thirty days (30) on half pay.
      24. Not fail to carry out duties diligently.
          - Penalty: Any member who fails to carry out his duties diligently shall be queried by his employer and the report sent to the State Coordinator for disciplinary action.
      25. Not leave his duty station or absent himself from any official activity without the written consent of the State Coordinator.
          - Penalty: Any member who leaves his duty station or absents himself from any official activity without the permission of the State Coordinator shall be tried by the Corps Disciplinary Committee and, if found guilty, be liable to extension of service with half pay double the period of absence.
      26. Not travel outside the State without written permission of the State Coordinator.
          - Penalty: Any member who travels outside the State without the written permission of the State Coordinator shall be tried by the Corps Disciplinary Committee and, if found guilty, be liable to forfeiture of allowance for the number of days absent and extension of service with half pay double the period of absence.
      27. Not be rude to constituted authority.
          - Penalty: Any member who is rude to constituted authority shall be tried by the Corps Disciplinary Committee and, if found guilty, be liable to extension of service for a period not less than thirty (30) days with half pay.
      
      **4. MISCELLANEOUS OFFENCES AND PENALTIES**
      7. Not engage in fighting.
          - Penalty: Any member who engages in fighting shall be liable to the following penalties: i) Extension of service for a period not less than twenty one (21) days without pay. ii) If the fight results in injury, the culprit shall bear the cost of medical treatment.
      9. Not take part in partisan politics.
          - Penalty: Any member who takes part in partisan politics is liable to extension of service for a period not less than three (3) months without pay.
      ---

      **Instructions:**
      1. Analyze the offense: "${offense}".
      2. Identify the most specific and relevant bye-law from the list above that the corps member has violated.
      3. In the body of the letter, you MUST quote the bye-law number and its exact text. For example: "...breach of the National Youth Service Corps Bye-Laws (Revised 2011), specifically Section 3, subsection 25 which states a member shall 'Not leave his duty station...'".
      4. Locate the corresponding penalty for the violated bye-law.
      5. **Crucially**, you must write a paragraph that states the specific penalty. This paragraph must start with "Please be aware that such an offense, as stipulated in the Bye-Laws," and then continue with the *exact, word-for-word penalty* from the bye-laws. For example: "Please be aware that such an offense, as stipulated in the Bye-Laws, shall make you liable on conviction of extension of service for thirty days (30) on half pay."
      6. Create a suitable title in ALL CAPS for the letter based on the offense.
      7. Fill in all details in the letter template below perfectly. The tone must be formal and authoritative.
      8. GENERATE ONLY the formatted plain text for the letter itself, starting from "Our Ref:". Do not include any introductory text, markdown, or commentary.

      **Letter Template:**

      Our Ref: NYSC/${lgaName.toUpperCase().substring(0,3)}/Q/${new Date().getFullYear() % 100}/${randomRefNum}
      Date: ${currentDate}

      ${corpMemberName}
      State Code: ${stateCode}
      ${ppa}

      Dear Corps Member,

      LETTER OF QUERY: [CREATE A SUITABLE TITLE IN ALL CAPS BASED ON THE OFFENSE DETAILS]

      It has come to the attention of this office that you have [rephrase the offense details into a formal statement].

      This action is in direct contravention of your duties as a corps member and constitutes a serious breach of the National Youth Service Corps Bye-Laws (Revised 2011). Specifically, your conduct violates Section 3, subsection [Cite the correct number from the bye-laws provided], which states that a corps member shall "[Quote the exact text of the bye-law]".

      [MODEL: INSERT THE PENALTY PARAGRAPH HERE AS PER INSTRUCTION #5]

      In light of the above, you are hereby directed to provide a formal written explanation for your actions. Your response should state clearly the reasons for your conduct.

      Your written explanation must be submitted to my office within forty-eight (48) hours of your receipt of this letter. Failure to respond within the stipulated time will be interpreted as an admission of guilt and will result in further disciplinary measures being taken without any further recourse to you.

      Yours in service,

      _________________________
      ${lgiName}
      Local Government Inspector
      ${lgaName}

      CC:
      The Zonal Inspector
      The State Coordinator
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating query draft:", error);
    if (error instanceof Error) {
        return `An error occurred while communicating with the AI service: ${error.message}. Please check your connection and API key.`;
    }
    return "An unknown error occurred.";
  }
};
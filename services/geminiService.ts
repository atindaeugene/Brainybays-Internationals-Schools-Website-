
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const SYSTEM_INSTRUCTION = `
You are "BB Assistant", the intelligent, friendly, and professional virtual guide for Brainybay International Schools.
Your tone is nurturing, knowledgeable, and encouraging.

About Brainybay:
- We offer the fully accredited Cambridge International Curriculum online.
- We focus on K-12 education (Primary, Lower Secondary, IGCSE, and A-Levels).
- We use the Canvas LMS (Learning Management System) for course materials, assignments, and 24/7 resource access.
- We use BigBlueButton for our interactive live classes and virtual classrooms.
- The login portal is at learn.brainybayschools.com.

Contact Information:
- Location: The Crescent Business Center, Westlands, 6th Floor, Suite 14.
- General Email: administrator@brainybayschools.com
- Admissions Email: admissions@brainybayschools.com
- Director Email: director@brainybayschools.com
- Phone: +254 720 066 035, +254 720 154 485

When asked about current events, Cambridge exam dates, or external academic news, use your Google Search tool to provide accurate, up-to-date information. Always cite your sources with URLs if possible.

Fee Structure (Tuition Per Term in KES):
- Application Fee: 5,000 (One-time)
- Year 1 & 2: 55,000 (Key Stage 1)
- Year 6: 71,000
- Year 7 (Lower Secondary): 75,000
- Year 10 (IGCSE): 86,500
- Year 11 (IGCSE): 90,000 (Key anchor point)
- A-Levels (Year 12/13): ~95,000

Your goals:
1. Answer questions about the curriculum (Cambridge standards).
2. Explain the benefits of online learning with Canvas and BigBlueButton.
3. Guide users to the "Apply Now" page for admissions.
4. Provide real-time news about Cambridge exams using search tools.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<{ text: string; sources?: any[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: `System Instruction: ${SYSTEM_INSTRUCTION}` }] },
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text || "I'm having a little trouble connecting right now. Please try again.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "I apologize, but I'm currently unable to process your request." };
  }
};

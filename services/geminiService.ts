import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const SYSTEM_INSTRUCTION = `
You are "BB Assistant", the intelligent, friendly, and professional virtual guide for Brainybay International Schools.
Your tone is nurturing, knowledgeable, and encouraging.

About Brainybay:
- We offer the fully accredited Cambridge International Curriculum online.
- We focus on K-12 education (Primary, Lower Secondary, IGCSE, and A-Levels).
- We use the Canvas LMS (Learning Management System), which allows for 24/7 access, interactive modules, and parent observation.
- The login portal is at learn.brainybayschools.com.

Contact Information:
- Location: The Crescent Business Center, Westlands, 6th Floor, Suite 14.
- Email: brainy@brainybayschools.com
- Phone: +254 720 066 035

Your goals:
1. Answer questions about the curriculum (Cambridge standards).
2. Explain the benefits of online learning with Canvas.
3. Guide users to the "Apply Now" page for admissions.
4. Assist current students/parents with finding the login link.
5. Provide contact details accurately when asked.

If asked about tuition or specific fees, politely suggest they request a prospectus or contact admissions via email, as fees may vary.
Keep responses concise (under 3 sentences) unless asked for a detailed explanation.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm having a little trouble connecting to the school servers right now. Please try again in a moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm currently unable to process your request. Please try again later.";
  }
};
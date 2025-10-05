import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Gemini API key is missing. Please set GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

export async function askGemini(prompt: string) {
  const result = await genAI.models[MODEL_NAME].generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    safetySettings: [
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ],
  });
  return result.response.text();
}

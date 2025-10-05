import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = "gemini-2.5-flash";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Gemini API key is missing. Please set GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

export async function askGemini(prompt: string) {
  const result = await genAI.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });
  return result.text;
}

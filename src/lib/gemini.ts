import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiProModel = "gemini-2.0-flash";
export const geminiFlashModel = "gemini-1.5-flash-latest";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const model = genAI.getGenerativeModel({ model: geminiFlashModel });

import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiProModel = "gemini-1.5-pro-latest";
export const geminiFlashModel = "gemini-1.5-flash-latest";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const model = genAI.getGenerativeModel({ model: geminiFlashModel });

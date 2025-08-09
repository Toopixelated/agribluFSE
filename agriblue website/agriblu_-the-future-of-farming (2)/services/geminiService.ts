import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll throw an error to make it clear.
  throw new Error("API_KEY environment variable not set.");
}

export const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = "You are AgriBot, a friendly, conversational, and knowledgeable AI assistant for the AgriBlu company. Your expertise is in modern agriculture, intelligent aeroponics, sustainable farming, energy efficiency in controlled environment agriculture (CEA), and agricultural technology. Answer user questions concisely and helpfully, remembering the context of the conversation. Keep your answers to a few sentences. Do not use markdown formatting.";

export const createChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });
};

import { GoogleGenAI, Type } from "@google/genai";
import { BibleVersion } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "Grace Guide", an AI assistant for Grace Community Church (GCC) Kenya. 
Your tone should be warm, welcoming, and biblically grounded.
`;

// Simple in-memory cache to make re-visiting chapters instant
const bibleCache: Record<string, { number: number; text: string }[]> = {};

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async chat(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });
      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      return "I'm having trouble connecting right now.";
    }
  }

  async fetchBibleVerses(book: string, chapter: number, version: BibleVersion) {
    const cacheKey = `${book}-${chapter}-${version}`;
    
    // Instant return if in cache
    if (bibleCache[cacheKey]) {
      return bibleCache[cacheKey];
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide the full text of ${book} chapter ${chapter} in the ${version} translation.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                number: { type: Type.INTEGER },
                text: { type: Type.STRING },
              },
              required: ["number", "text"],
            },
          },
        }
      });
      
      const jsonStr = response.text?.trim() || '[]';
      const verses = JSON.parse(jsonStr) as { number: number; text: string }[];
      
      // Store in cache for next time
      bibleCache[cacheKey] = verses;
      return verses;
    } catch (error) {
      console.error("Bible Fetch Error:", error);
      return [];
    }
  }
}

export const geminiService = new GeminiService();

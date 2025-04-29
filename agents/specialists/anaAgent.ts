import { getOpenAIResponse } from "@/lib/openai";

export async function anaAgent(question: string) {
  const prompt = `Ponašaj se kao pravni savetnik u Srbiji. Daj informativan i praktičan odgovor bez garantovanja pravne sigurnosti. Pitanje: "${question}"`;
  return await getOpenAIResponse(prompt);
}

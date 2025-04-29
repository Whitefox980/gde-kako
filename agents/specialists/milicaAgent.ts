import { getOpenAIResponse } from "@/lib/openai";

export async function milicaAgent(question: string) {
  const prompt = `Ponašaj se kao vodič za lokacije i orijentaciju. Daj korisniku precizan, praktičan odgovor sa opcijama ako je moguće. Pitanje: "${question}"`;
  return await getOpenAIResponse(prompt);
}

import { getOpenAIResponse } from "@/lib/openai";

export async function jocaAgent(question: string) {
  const prompt = `Ponašaj se kao analitičar cena. Pronađi najpovoljnije opcije i prikaži relevantne cene korisniku. Pitanje: "${question}"`;
  return await getOpenAIResponse(prompt);
}

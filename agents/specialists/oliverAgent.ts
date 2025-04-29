import { getOpenAIResponse } from "@/lib/openai";

export async function oliverAgent(question: string) {
  const prompt = `Ponašaj se kao medicinski savetnik. Daj opšte informacije o zdravlju, ali upozori korisnika da se konsultuje sa lekarom. Pitanje: "${question}"`;
  return await getOpenAIResponse(prompt);
}

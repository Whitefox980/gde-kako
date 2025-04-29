import { getOpenAIResponse } from "@/lib/openai";

export async function predragAgent(question: string) {
  const prompt = `Ponašaj se kao ekspert za tehnologiju. Odgovori jasno, stručno i konkretno na pitanje korisnika. Pitanje: "${question}"`;
  return await getOpenAIResponse(prompt);
}

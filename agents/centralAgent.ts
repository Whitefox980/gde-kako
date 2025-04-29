import { TavilySearchClient } from "tavily";
import { Configuration, OpenAIApi } from "openai";

const tavily = new TavilySearchClient(process.env.TAVILY_API_KEY!);
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export async function centralAgent(question: string): Promise<{ message: string; answer: string; }> {
  // 1. Tavily pretraga
  const tavilyResponse = await tavily.search({
    query: question,
    max_results: 5,
    include_answer: true,
  });

  const sources = tavilyResponse.results.map((r) => `- ${r.title}: ${r.url}`).join("\n");

  // 2. Prompt za OpenAI
  const prompt = `
Ti si veštačka inteligencija koja pomaže korisnicima da pronađu informacije na internetu.

Korisničko pitanje: "${question}"

Na osnovu sledećih rezultata koje sam ti pronašao:

${sources}

Napiši kratak, jasan, koristan odgovor kao da si concierge.
Počni sa: "**Pronašao sam za vas:**", i zatim navedi ključne stvari (ne više od 5 rečenica).
Ako postoje relevantni linkovi, preporuči ih na kraju odgovora.

Odgovori na srpskom jeziku.
`;

  // 3. OpenAI obrada
  const aiResponse = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
  });

  const fullAnswer = aiResponse.data.choices[0].message?.content?.trim() || "Nije pronađeno.";

  // 4. Slanje odgovora na backend (api/log-answer)
  try {
    await fetch("/api/log-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        answer: fullAnswer,
        sources: tavilyResponse.results.map(r => ({ title: r.title, url: r.url })),
      }),
    });
  } catch (err) {
    console.error("Greška pri slanju ka log-answer API:", err);
  }

  return {
    message: fullAnswer,
    answer: fullAnswer,
  };
}

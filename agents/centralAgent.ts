import fs from "fs";
import path from "path";

...

export async function centralAgent(question: string): Promise<{ message: string; answer: string; }> {
  // ... Tavily i OpenAI kao do sada

  const fullAnswer = aiResponse.data.choices[0].message?.content?.trim() || "Nije pronađeno.";

  // UPIS U BAZU
  try {
    const filePath = path.join(process.cwd(), "data", "answers.json");
    const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    existing.push({
      question,
      answer: fullAnswer,
      timestamp: new Date().toISOString(),
      sources: tavilyResponse.results.map(r => ({ title: r.title, url: r.url })),
    });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error("Greška pri upisu u bazu:", err);
  }

  return {
    message: fullAnswer,
    answer: fullAnswer,
  };
}

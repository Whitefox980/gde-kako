import { articles } from "../lib/articles";
import { askOpenAI } from "../lib/openai";

function findRelatedArticles(question: string) {
  const keywords = question.toLowerCase().split(" ");
  return articles.filter(article =>
    keywords.some(word =>
      article.title.toLowerCase().includes(word) ||
      article.description.toLowerCase().includes(word)
    )
  );
}

export async function centralAgent(prompt: string) {
  const relatedArticles = findRelatedArticles(prompt);
  const answer = await askOpenAI(prompt);

  const message = relatedArticles.length
    ? `Na osnovu vašeg pitanja, pronašao sam ${relatedArticles.length} članak(a) koji bi mogli biti korisni.`
    : "Evo odgovora koji sam pripremio:";

  const articleList = relatedArticles
    .map((a) => `• [${a.title}](${a.url}) — ${a.description}`)
    .join("\n");

  return {
    message,
    answer: `${answer}${relatedArticles.length ? "\n\n**Preporučeni članci:**\n" + articleList : ""}`
  };
}

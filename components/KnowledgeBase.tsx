import { articles } from "../lib/articles";

export default function KnowledgeBase() {
  const grouped = articles.reduce<Record<string, typeof articles>>((acc, a) => {
    if (!acc[a.category]) acc[a.category] = [];
    acc[a.category].push(a);
    return acc;
  }, {});

  return (
    <div className="mt-10 w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Baza znanja</h2>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{category}</h3>
          <ul className="space-y-2">
            {items.map((a, i) => (
              <li key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow">
                <a href={a.url} className="text-lg font-semibold hover:underline">{a.title}</a>
                <p className="text-gray-600 dark:text-gray-400">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

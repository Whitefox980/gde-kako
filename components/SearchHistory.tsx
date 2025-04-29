import { useEffect, useState } from "react";

type Props = {
  onSelect: (question: string) => void;
};

export default function SearchHistory({ onSelect }: Props) {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("searchHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  if (history.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Tvoja prethodna pitanja:</h2>
      <div className="grid gap-2">
        {history.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 transition"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

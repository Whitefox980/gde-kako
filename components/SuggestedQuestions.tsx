import { useEffect, useState } from "react";
import { getStoredQuestions, QuestionItem } from "../lib/data";

type Props = {
  onSelect: (question: string) => void;
};

export default function SuggestedQuestions({ onSelect }: Props) {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);

  useEffect(() => {
    const stored = getStoredQuestions();
    setQuestions(stored);
  }, []);

  const grouped = questions.reduce<Record<string, string[]>>((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q.text);
    return acc;
  }, {});

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Predložena pitanja:</h2>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{category}</h3>
          <div className="grid gap-2">
            {items.map((q, i) => (
              <button
                key={i}
                onClick={() => onSelect(q)}
                className="text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

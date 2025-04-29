import { useEffect, useState } from "react";
import { getStoredQuestions, saveQuestions, QuestionItem } from "../lib/data";

const categories = ["Zdravlje", "Tehnologija", "Pravo", "Lokacije", "Cene"];

export default function AdminPanel() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    const stored = getStoredQuestions();
    setQuestions(stored);
  }, []);

  const handleAdd = () => {
    if (!newQuestion.trim()) return;
    const updated = [...questions, { text: newQuestion, category }];
    setQuestions(updated);
    saveQuestions(updated);
    setNewQuestion("");
  };

  const handleRemove = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
    saveQuestions(updated);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel – Predložena pitanja</h2>

      <ul className="space-y-2">
        {questions.map((q, i) => (
          <li key={i} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
            <span>
              <strong className="text-blue-600">{q.category}:</strong> {q.text}
            </span>
            <button
              onClick={() => handleRemove(i)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              Obriši
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 mt-6">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Novo pitanje..."
          className="px-3 py-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dodaj
        </button>
      </div>
    </div>
  );
}

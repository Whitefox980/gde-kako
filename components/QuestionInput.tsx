import { useState } from "react";

type Props = {
  onSubmit: (question: string) => void;
  loading: boolean;
};

export default function QuestionInput({ onSubmit, loading }: Props) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question.trim());
      setQuestion("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-8">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Postavi pitanje... npr. 'Gde mogu da popravim telefon?'"
        className="w-full max-w-xl px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-lg"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Tražim..." : "Pošalji"}
      </button>
    </form>
  );
}

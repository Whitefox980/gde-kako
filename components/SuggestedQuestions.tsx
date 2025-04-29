type Props = {
  onSelect: (question: string) => void;
};

const suggestions = [
  "Gde mogu da pronađem najbližu apoteku?",
  "Kako da popravim slomljeni ekran telefona?",
  "Koliko košta registracija automobila?",
  "Koji su najbliži kafići otvoreni sada?",
  "Da li mi treba pravnik za overu ugovora?",
];

export default function SuggestedQuestions({ onSelect }: Props) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Predložena pitanja:</h2>
      <div className="grid gap-3">
        {suggestions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

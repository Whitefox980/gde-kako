export type QuestionItem = {
  text: string;
  category: string;
};

const defaultQuestions: QuestionItem[] = [
  { text: "Gde mogu da pronađem najbližu apoteku?", category: "Zdravlje" },
  { text: "Kako da popravim slomljeni ekran telefona?", category: "Tehnologija" },
  { text: "Koliko košta registracija automobila?", category: "Cene" },
  { text: "Koji su najbliži kafići otvoreni sada?", category: "Lokacije" },
  { text: "Da li mi treba pravnik za overu ugovora?", category: "Pravo" }
];

export function getStoredQuestions(): QuestionItem[] {
  if (typeof window === "undefined") return defaultQuestions;
  const data = localStorage.getItem("suggestedQuestions");
  return data ? JSON.parse(data) : defaultQuestions;
}

export function saveQuestions(list: QuestionItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("suggestedQuestions", JSON.stringify(list));
  }
}

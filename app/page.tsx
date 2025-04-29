'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  answer: string;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error('Greška pri učitavanju pitanja:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % questions.length);
    }, 5000); // svakih 5 sekundi menjamo pitanje

    return () => clearInterval(interval);
  }, [questions]);

  const currentQuestions = [
    questions[(index) % questions.length],
    questions[(index + 1) % questions.length],
    questions[(index + 2) % questions.length]
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-green-400 p-6 font-mono relative">
      <div className="absolute top-4 left-4">
        {currentQuestions.map((q, idx) => (
          <div
            key={idx}
            className="mb-3 transition-opacity duration-700 ease-in-out opacity-100"
          >
            {q?.question}
          </div>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl">Dobrodošli na Gde-Kako.rs!</h1>
      </div>
    </div>
  );
}

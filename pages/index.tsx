"use client";

import { useState } from "react";
import QuestionInput from "@/components/QuestionInput";
import SuggestedQuestions from "@/components/SuggestedQuestions";
import AnswerDisplay from "@/components/AnswerDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import { centralAgent } from "@/agents/centralAgent";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (question: string) => {
    setLoading(true);
    setMessage("");
    setAnswer("");
    try {
      const result = await centralAgent(question);
      setMessage(result.message);
      setAnswer(result.answer);
    } catch (error) {
      console.error(error);
      setMessage("Došlo je do greške prilikom obrade vašeg pitanja.");
      setAnswer("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mt-6">Gde-Kako.rs</h1>
      <p className="text-gray-600 mt-2 text-lg">Brzi odgovori na vaša svakodnevna pitanja</p>

      <QuestionInput onSubmit={handleSubmit} loading={loading} />

      <SuggestedQuestions onSelect={handleSubmit} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        message && answer && <AnswerDisplay message={message} answer={answer} />
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import AIOperator from "../components/AIOperator";
import KnowledgeBase from "../components/KnowledgeBase";
import SearchHistory from "../components/SearchHistory";
import QuestionInput from "../components/QuestionInput";
import SuggestedQuestions from "../components/SuggestedQuestions";
import AnswerDisplay from "../components/AnswerDisplay";
import LoadingSpinner from "../components/LoadingSpinner";
import { centralAgent } from "../agents/centralAgent";
import { motion } from "framer-motion";

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [agentAssigned, setAgentAssigned] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (q: string) => {
    setQuestion(q);           // Pokreće AIOperator
    setAgentAssigned(null);   // Resetuje agenta na svaki novi upit
    setLoading(true);

    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const updatedHistory = [q, ...history.filter((h) => h !== q)].slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    
    setMessage("");
    setAnswer("");

    try {
      const result = await centralAgent(q);
      setMessage(result.message);
      setAnswer(result.answer);
    } catch (error) {
      console.error(error);
      setMessage("Došlo je do greške prilikom obrade vašeg pitanja.");
      setAnswer("");
    }

    setLoading(false);
  };

  if (!agentAssigned && question) {
    return (
      <AIOperator question={question} onReady={(agent) => setAgentAssigned(agent)} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <button
        onClick={() => {
          const html = document.documentElement;
          const current = html.getAttribute("data-theme") || "light";
          const newTheme = current === "dark" ? "light" : "dark";
          html.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);
        }}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg"
      >
        Promeni temu
      </button>

      <h1 className="text-3xl font-bold mt-6 text-center">Gde-Kako.rs</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg text-center">
        Brzi odgovori na vaša svakodnevna pitanja
      </p>

      <QuestionInput onSubmit={handleSubmit} loading={loading} />
      <SuggestedQuestions onSelect={handleSubmit} />
      <SearchHistory onSelect={handleSubmit} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        message &&
        answer && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <AnswerDisplay message={message} answer={answer} />
            <KnowledgeBase />
          </motion.div>
        )
      )}
    </div>
  );
}

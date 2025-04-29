"use client";

import { useState, useEffect } from "react";

const aiAgents = {
  turisticki: "Milica, stručnjak za turizam",
  pravni: "Marko, pravni savetnik",
  trzisni: "Vanja, analitičar tržišta",
  nekretninski: "Sonja, stručnjak za nekretnine",
  lekarski: "Dr Luka, savetnik za zdravlje",
  opsti: "AI Operator",
};

function detectAgentArea(question: string): keyof typeof aiAgents {
  const q = question.toLowerCase();
  if (q.includes("restoran") || q.includes("kafić") || q.includes("putovanje") || q.includes("hotel")) return "turisticki";
  if (q.includes("registracija") || q.includes("pravo") || q.includes("zakon") || q.includes("ugovor")) return "pravni";
  if (q.includes("cena") || q.includes("prodaja") || q.includes("kupovina")) return "trzisni";
  if (q.includes("stan") || q.includes("nekretnine") || q.includes("iznajmljivanje")) return "nekretninski";
  if (q.includes("lekar") || q.includes("klinika") || q.includes("zdravlje") || q.includes("bolnica")) return "lekarski";
  return "opsti";
}

const playSound = () => {
  const audio = new Audio("/sounds/ping.mp3");
  audio.play();
};

export default function AIOperator({ question, onReady }: { question: string; onReady: (agent: string) => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!question) return;

    const steps = [
      "Povezivanje sa Centralom...",
      "AI Operator vas je primio...",
      "Proveravamo agente u bazi Matrixa...",
      `Pronađen agent: ${aiAgents[detectAgentArea(question)]}`,
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        setStep((prev) => prev + 1);
        currentStep++;
      } else {
        clearInterval(interval);
        playSound();
        const agentName = aiAgents[detectAgentArea(question)];
        onReady(agentName);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [question]);

  if (!question) return null;

  const messages = [
    "Dobrodošli u Srpski Matrix.",
    "Dobili ste AI Operatora Centrale.",
    "Kako vam možemo pomoći danas?",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono p-8 bg-[radial-gradient(circle,rgba(0,255,0,0.1),transparent)]">
      <div className="text-center space-y-4 mb-8">
        {messages.map((msg, idx) => (
          <p key={idx} className="text-lg animate-pulse">{msg}</p>
        ))}
      </div>

      {step > 0 && (
        <div className="mt-10 text-left w-full max-w-md mx-auto">
          <TypingLine text={
            step === 1
              ? "Povezivanje..."
              : step === 2
              ? "Provera agenata..."
              : `Agent dodeljen: ${aiAgents[detectAgentArea(question)]}`
          } />
        </div>
      )}
    </div>
  );
}

function TypingLine({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <p className="text-green-400 font-mono text-sm">{displayed}</p>;
}

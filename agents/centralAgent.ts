import { predragAgent } from "./specialists/predragAgent";
import { milicaAgent } from "./specialists/milicaAgent";
import { jocaAgent } from "./specialists/jocaAgent";
import { oliverAgent } from "./specialists/oliverAgent";
import { anaAgent } from "./specialists/anaAgent";

type AgentResult = {
  message: string;
  answer: string;
};

export async function centralAgent(question: string): Promise<AgentResult> {
  const q = question.toLowerCase();

  if (q.match(/(tehnologija|laptop|telefon|računar|aplikacija|softver)/)) {
    return {
      message: "Vaše pitanje je iz oblasti tehnologije. Preusmeravam ga agentu **Predragu**.",
      answer: await predragAgent(question),
    };
  }

  if (q.match(/(gde|lokacija|najbliži|blizu|adresa|restoran|prodavnica)/)) {
    return {
      message: "Vaše pitanje je vezano za lokacije. Preusmeravam ga agentu **Milici**.",
      answer: await milicaAgent(question),
    };
  }

  if (q.match(/(cena|najjeftinije|koliko košta|trošak|budžet|jeftino)/)) {
    return {
      message: "Vaše pitanje je vezano za cene i analizu tržišta. Preusmeravam ga agentu **Joci**.",
      answer: await jocaAgent(question),
    };
  }

  if (q.match(/(zdravlje|simptom|lek|bolnica|doktor|pregled)/)) {
    return {
      message: "Vaše pitanje je iz oblasti zdravlja. Preusmeravam ga agentu **Oliveru**.",
      answer: await oliverAgent(question),
    };
  }

  if (q.match(/(pravo|ugovor|zakon|pravni|sud|pravnik)/)) {
    return {
      message: "Vaše pitanje je pravne prirode. Preusmeravam ga agentu **Ani**.",
      answer: await anaAgent(question),
    };
  }

  return {
    message: "Vaše pitanje ne spada ni u jednu specifičnu kategoriju. Dajem univerzalni odgovor.",
    answer: "Trenutno nemamo specijalizovanog agenta za ovu temu. Pokušajte da precizirate pitanje ili promenite formulaciju.",
  };
}

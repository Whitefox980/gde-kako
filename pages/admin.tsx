import React from "react";

const pitanja = [
  { pitanje: "Gde da registrujem auto?", broj: 15 },
  { pitanje: "Kako da otvorim firmu?", broj: 9 },
  { pitanje: "Gde su najbliže apoteke?", broj: 7 },
  { pitanje: "Kako da promenim adresu?", broj: 5 },
];

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Izveštaj - Aktivnost korisnika
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {pitanja.map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-800 p-6 rounded-3xl shadow-inner hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
              {item.pitanje}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Broj klikova: <span className="font-bold">{item.broj}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";

interface AgentCardProps {
  name: string;
  title: string;
  image?: string;
}

export default function AgentCard({ name, title, image }: AgentCardProps) {
  return (
    <div className="flex flex-col items-center bg-black border border-green-500 rounded-xl p-6 shadow-[0_0_15px_#00ff00]">
      <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-green-500 shadow-md">
        <img
          src={image || "/images/agent-default.png"}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <h2 className="text-green-400 text-xl font-bold">{name}</h2>
      <p className="text-green-300 text-sm">{title}</p>
    </div>
  );
}

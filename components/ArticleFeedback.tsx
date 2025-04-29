import { useEffect, useState } from "react";

export default function ArticleFeedback({ slug }: { slug: string }) {
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem(`voted-${slug}`);
    if (history) setVoted(true);
  }, [slug]);

  const handleVote = (helpful: boolean) => {
    localStorage.setItem(`voted-${slug}`, helpful ? "yes" : "no");
    setVoted(true);
  };

  if (voted) {
    return (
      <div className="mt-10 text-green-600 dark:text-green-400 font-medium">
        Hvala na odgovoru!
      </div>
    );
  }

  return (
    <div className="mt-10">
      <p className="mb-2">Da li vam je ovaj članak bio koristan?</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleVote(true)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          Da
        </button>
        <button
          onClick={() => handleVote(false)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Ne
        </button>
      </div>
    </div>
  );
}

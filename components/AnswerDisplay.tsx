type Props = {
  message: string;
  answer: string;
};

export default function AnswerDisplay({ message, answer }: Props) {
  return (
    <div className="mt-10 max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4">
      <div className="text-blue-600 font-semibold">{message}</div>
      <div className="text-gray-800 text-lg whitespace-pre-line">{answer}</div>
    </div>
  );
}

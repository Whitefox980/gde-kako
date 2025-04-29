import { motion } from "framer-motion";

type Props = {
  message: string;
  answer: string;
};

export default function AnswerDisplay({ message, answer }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-10 max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 space-y-4"
    >
      <div className="text-blue-600 dark:text-blue-400 font-semibold">{message}</div>
      <div className="text-gray-800 dark:text-gray-100 text-lg whitespace-pre-line">{answer}</div>
    </motion.div>
  );
}

import { useState } from "react";
import axios from "axios";
import { askAboutRecommendation } from "../api/recommendations";

interface AskFollowUpProps {
  recommendationId: string;
}

export function AskFollowUp({ recommendationId }: AskFollowUpProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAsking, setIsAsking] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk() {
    if (!question.trim()) return;
    setError("");
    setIsAsking(true);
    try {
      const result = await askAboutRecommendation(
        recommendationId,
        question.trim(),
      );
      setAnswers((prev) => [...prev, result.answer]);
      setQuestion("");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Could not get an answer.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsAsking(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs font-mono text-teal hover:underline mt-3"
      >
        Ask a question about this match →
      </button>
    );
  }

  const limitReached = answers.length >= 3;

  return (
    <div className="mt-4 border-t border-ink/10 pt-4 space-y-3">
      {answers.map((answer, i) => (
        <div
          key={i}
          className="bg-teal/5 border border-teal/20 rounded-lg p-3 text-sm text-ink/80"
        >
          {answer}
        </div>
      ))}

      {error && <p className="text-xs text-rust">{error}</p>}

      {limitReached ? (
        <p className="text-xs text-ink/40 italic">
          You've reached the question limit for this match.
        </p>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="e.g. Why did this rank above Data Scientist?"
            className="flex-1 px-3 py-2 text-sm border border-ink/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal bg-white"
          />
          <button
            onClick={handleAsk}
            disabled={isAsking}
            className="bg-ink text-paper px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal transition disabled:opacity-50"
          >
            {isAsking ? "..." : "Ask"}
          </button>
        </div>
      )}
    </div>
  );
}

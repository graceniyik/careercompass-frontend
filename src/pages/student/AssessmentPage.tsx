import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestions, submitAssessment } from "../../api/assessments";
import type { AssessmentQuestion } from "../../types";
import axios from "axios";

export function AssessmentPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getQuestions()
      .then((data) => setQuestions(data))
      .catch(() => setError("Failed to load assessment questions."))
      .finally(() => setIsLoading(false));
  }, []);

  function handleLikertChange(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleTextChange(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSubmit() {
    setError("");

    // Basic client-side completeness check before hitting the backend
    const unanswered = questions.filter((q) => answers[q.id] === undefined);
    if (unanswered.length > 0) {
      setError(
        `Please answer all questions before submitting (${unanswered.length} remaining).`,
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = questions.map((q) => {
        if (q.type === "LIKERT") {
          return { questionId: q.id, likertValue: answers[q.id] as number };
        }
        return { questionId: q.id, textAnswer: answers[q.id] as string };
      });

      const assessment = await submitAssessment(payload);
      navigate(`/assessments/${assessment.id}/results`);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Submission failed.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading assessment...</p>
      </div>
    );
  }

  const likertQuestions = questions.filter((q) => q.type === "LIKERT");
  const qualitativeQuestions = questions.filter(
    (q) => q.type === "QUALITATIVE",
  );
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">
            Career Assessment
          </h1>
          <p className="text-slate-500">
            Answer honestly — there are no right or wrong answers. Progress:{" "}
            {answeredCount} / {questions.length}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Part 1 — How much do you agree?
            </h2>
            <div className="space-y-6">
              {likertQuestions.map((q) => (
                <div key={q.id}>
                  <p className="text-slate-700 mb-2">{q.text}</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleLikertChange(q.id, value)}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                          answers[q.id] === value
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Strongly disagree</span>
                    <span>Strongly agree</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Part 2 — Tell us more about you
            </h2>
            <div className="space-y-6">
              {qualitativeQuestions.map((q) => (
                <div key={q.id}>
                  <label className="block text-slate-700 mb-2">{q.text}</label>
                  <textarea
                    rows={3}
                    value={(answers[q.id] as string) || ""}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    placeholder="Write at least a couple of sentences..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-slate-900 transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting and scoring..." : "Submit Assessment"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAssessmentById } from "../../api/assessments";
import { getMyProfile } from "../../api/students";
import type { Assessment, StudentProfile } from "../../types";
import { RiasecRadarChart } from "../../components/RiasecRadarChart";
import { RiasecCompareChart } from "../../components/RiasecCompareChart";
import { AskFollowUp } from "../../components/AskFollowUp";
import { Navbar } from "../../components/Navbar";

const COMPARE_COLORS = ["#C99A3C", "#3B6F6B", "#B1503A"];

function parseRoadmap(raw?: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [raw];
  } catch {
    return [raw];
  }
}

export function AssessmentResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getMyProfile()
      .then(setProfile)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!id) return;

    function fetchData() {
      getAssessmentById(id!)
        .then((data) => {
          setAssessment(data);
          const stillPending = data.recommendations?.some(
            (rec) => rec.status === "PENDING",
          );
          if (!stillPending && pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        })
        .catch(() => setError("Failed to load results."))
        .finally(() => setIsLoading(false));
    }

    fetchData();
    pollingRef.current = setInterval(fetchData, 4000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [id]);

  const studentSkillNames = new Set(
    (profile?.skills ?? []).map((s) => s.skill.name.toLowerCase()),
  );

  function toggleCompare(recommendationId: string) {
    setCompareIds((prev) => {
      if (prev.includes(recommendationId)) {
        return prev.filter((id) => id !== recommendationId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, recommendationId];
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="text-ink/50 font-mono text-sm">Loading your results...</p>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="text-rust">{error || "Assessment not found."}</p>
      </div>
    );
  }

  const compareRecs = (assessment.recommendations ?? []).filter((r) =>
    compareIds.includes(r.id),
  );

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <Link to="/dashboard" className="text-sm text-teal hover:underline">
          ← Back to dashboard
        </Link>

        <div className="bg-white border border-ink/10 rounded-2xl shadow-sm p-8 animate-fade-rise">
          <p className="font-mono text-xs tracking-widest text-teal uppercase mb-2">
            Your coordinates
          </p>
          <h1 className="font-display text-2xl font-semibold mb-4">
            RIASEC Profile
          </h1>
          <RiasecRadarChart scores={assessment.riasecScores} />
        </div>

        {compareRecs.length >= 2 && (
          <div className="bg-white border border-gold/40 rounded-2xl shadow-sm p-8">
            <p className="font-mono text-xs tracking-widest text-gold uppercase mb-2">
              Comparing
            </p>
            <h2 className="font-display text-xl font-semibold mb-4">
              {compareRecs.map((r) => r.career.title).join(" vs. ")}
            </h2>
            <RiasecCompareChart
              series={compareRecs.map((r, i) => ({
                label: r.career.title,
                color: COMPARE_COLORS[i % COMPARE_COLORS.length],
                scores: r.career.riasecCode,
              }))}
            />

            <div className="mt-6 space-y-4">
              <p className="font-mono text-xs tracking-widest text-teal uppercase">
                Required skills
              </p>
              {compareRecs.map((r) => (
                <div key={r.id}>
                  <p className="text-sm font-medium mb-1">{r.career.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {(r.career.requiredSkills ?? []).map((rs) => {
                      const has = studentSkillNames.has(
                        rs.skill.name.toLowerCase(),
                      );
                      return (
                        <span
                          key={rs.skill.id}
                          className={`text-xs font-mono px-2 py-1 rounded-full border ${
                            has
                              ? "bg-teal/10 text-teal border-teal/30"
                              : "bg-rust/5 text-rust/70 border-rust/20"
                          }`}
                        >
                          {has ? "✓" : "○"} {rs.skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold">
              Recommended Careers
            </h2>
            {compareIds.length > 0 && (
              <p className="text-xs font-mono text-ink/40">
                {compareIds.length}/3 selected to compare
              </p>
            )}
          </div>
          <div className="space-y-4">
            {assessment.recommendations?.map((rec) => {
              const roadmapSteps = parseRoadmap(rec.aiRoadmapText);
              const requiredSkills = rec.career.requiredSkills ?? [];
              const isComparing = compareIds.includes(rec.id);

              return (
                <div
                  key={rec.id}
                  className={`bg-white border rounded-2xl shadow-sm p-6 hover:-translate-y-0.5 transition-transform ${
                    isComparing ? "border-gold" : "border-ink/10"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-lg font-semibold">
                      {rec.career.title}
                    </h3>
                    <span className="bg-gold text-ink text-sm font-mono font-medium px-3 py-1 rounded-full">
                      {Math.round(rec.matchScore)}%
                    </span>
                  </div>
                  <p className="text-ink/60 text-sm mb-4">
                    {rec.career.description}
                  </p>

                  {requiredSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {requiredSkills.map((rs) => {
                        const has = studentSkillNames.has(
                          rs.skill.name.toLowerCase(),
                        );
                        return (
                          <span
                            key={rs.skill.id}
                            className={`text-xs font-mono px-2 py-1 rounded-full border ${
                              has
                                ? "bg-teal/10 text-teal border-teal/30"
                                : "bg-rust/5 text-rust/70 border-rust/20"
                            }`}
                          >
                            {has ? "✓" : "○"} {rs.skill.name}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {rec.status === "PENDING" && (
                    <div className="flex items-center gap-2 text-sm text-gold italic">
                      <span className="inline-block h-2 w-2 rounded-full bg-gold animate-pulse" />
                      Generating personalized explanation...
                    </div>
                  )}

                  {rec.status === "COMPLETED" && rec.aiExplanation && (
                    <>
                      <div className="bg-paper/60 rounded-lg p-4 text-sm text-ink/80 space-y-4">
                        <p>{rec.aiExplanation}</p>

                        {roadmapSteps.length > 0 && (
                          <div>
                            <p className="font-mono text-xs tracking-widest text-teal uppercase mb-3">
                              Roadmap
                            </p>
                            <ol className="space-y-2">
                              {roadmapSteps.map((step, i) => (
                                <li key={i} className="flex gap-3">
                                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-ink text-paper font-mono text-[11px] flex items-center justify-center mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>

                      <AskFollowUp recommendationId={rec.id} />

                      <label className="flex items-center gap-2 mt-4 text-xs font-mono text-ink/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isComparing}
                          onChange={() => toggleCompare(rec.id)}
                          disabled={!isComparing && compareIds.length >= 3}
                          className="accent-gold"
                        />
                        Compare this career
                      </label>
                    </>
                  )}

                  {rec.status === "FAILED" && (
                    <p className="text-sm text-rust italic">
                      Explanation unavailable — please try again later.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

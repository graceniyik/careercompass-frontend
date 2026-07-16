import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";

const WAYPOINTS = [
  {
    number: "01",
    title: "Take the assessment",
    body: "Answer structured questions and a few open-ended prompts about what genuinely interests you.",
  },
  {
    number: "02",
    title: "Get your coordinates",
    body: "We plot your Realistic, Investigative, Artistic, Social, Enterprising, and Conventional profile.",
  },
  {
    number: "03",
    title: "Discover matched careers",
    body: "See careers ranked by fit, with a plain-language explanation of why each one suits you.",
  },
  {
    number: "04",
    title: "Follow your roadmap",
    body: "Get concrete next steps — skills, certifications, and programs — for the paths that interest you.",
  },
];

export function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-rise">
          <p className="font-mono text-xs tracking-widest text-teal uppercase mb-4">
            AI Career Guidance
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-semibold mb-6">
            Find the career your profile already points to.
          </h1>
          <p className="text-ink/70 text-lg mb-8 max-w-md">
            CareerCompass AI plots your interests and skills against real career
            paths, and explains exactly why each recommendation fits — no
            generic quiz-app guesswork.
          </p>
          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-gold text-ink px-6 py-3 rounded-full font-medium hover:bg-teal hover:text-paper transition"
              >
                Go to your dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-gold text-ink px-6 py-3 rounded-full font-medium hover:bg-teal hover:text-paper transition"
                >
                  Start your assessment
                </Link>
                <Link
                  to="/login"
                  className="text-teal font-medium hover:underline"
                >
                  Log in →
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center animate-breathe">
          <svg
            viewBox="0 0 300 300"
            className="w-full max-w-sm"
            role="img"
            aria-label="Illustrative compass chart of a career profile"
          >
            <circle
              cx="150"
              cy="150"
              r="110"
              fill="none"
              stroke="#1C2B2A"
              strokeOpacity="0.15"
              strokeDasharray="2 5"
            />
            <circle
              cx="150"
              cy="150"
              r="73"
              fill="none"
              stroke="#1C2B2A"
              strokeOpacity="0.15"
              strokeDasharray="2 5"
            />
            <circle
              cx="150"
              cy="150"
              r="37"
              fill="none"
              stroke="#1C2B2A"
              strokeOpacity="0.15"
              strokeDasharray="2 5"
            />
            {[
              [150, 40],
              [245, 95],
              [245, 205],
              [150, 260],
              [55, 205],
              [55, 95],
            ].map(([x, y], i) => (
              <line
                key={i}
                x1="150"
                y1="150"
                x2={x}
                y2={y}
                stroke="#1C2B2A"
                strokeOpacity="0.15"
              />
            ))}
            <polygon
              points="150,78.5 235.7,100.5 202.4,180.25 150,238 92.8,183 69,103.25"
              fill="#C99A3C"
              fillOpacity="0.25"
              stroke="#3B6F6B"
              strokeWidth="2"
            />
            {[
              [150, 78.5],
              [235.7, 100.5],
              [202.4, 180.25],
              [150, 238],
              [92.8, 183],
              [69, 103.25],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="#3B6F6B" />
            ))}
            {[
              [150, 25, "R"],
              [258, 90, "I"],
              [258, 212, "A"],
              [150, 278, "S"],
              [42, 212, "E"],
              [42, 90, "C"],
            ].map(([x, y, label], i) => (
              <text
                key={i}
                x={x as number}
                y={y as number}
                textAnchor="middle"
                className="font-mono"
                fontSize="13"
                fill="#1C2B2A"
                opacity="0.6"
              >
                {label}
              </text>
            ))}
          </svg>
        </div>
      </section>

      <section className="bg-ink text-paper py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl font-semibold mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {WAYPOINTS.map((wp) => (
              <div
                key={wp.number}
                className="hover:-translate-y-1 transition-transform"
              >
                <p className="font-mono text-gold text-sm mb-3">{wp.number}</p>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {wp.title}
                </h3>
                <p className="text-paper/70 text-sm leading-relaxed">
                  {wp.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl font-semibold mb-12">
          Built to be trusted, not just tried
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center mb-4">
              <span className="font-mono text-teal text-sm">%</span>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">
              Explainable matches
            </h3>
            <p className="text-ink/70 text-sm leading-relaxed">
              Every match score is calculated, not guessed by AI — so you can
              see exactly why a career fits your profile.
            </p>
          </div>
          <div className="hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
              <span className="font-mono text-gold text-sm">✓</span>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">
              Human-reviewed
            </h3>
            <p className="text-ink/70 text-sm leading-relaxed">
              Career counselors can review and annotate your results — AI
              guidance, with a person still in the loop.
            </p>
          </div>
          <div className="hover:-translate-y-1 transition-transform">
            <div className="w-10 h-10 rounded-full bg-rust/10 border border-rust/30 flex items-center justify-center mb-4">
              <span className="font-mono text-rust text-sm">→</span>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">
              Personalized roadmaps
            </h3>
            <p className="text-ink/70 text-sm leading-relaxed">
              Get concrete next steps for the specific careers you're interested
              in — not a generic list.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-10">
        <div className="max-w-5xl mx-auto px-6 text-sm text-ink/50">
          CareerCompass AI — a student career guidance project.
        </div>
      </footer>
    </div>
  );
}

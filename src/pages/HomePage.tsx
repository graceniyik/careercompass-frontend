import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";

export function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-16 animate-fade-rise">
        <p className="font-mono text-xs tracking-widest text-teal uppercase mb-3">
          Dashboard
        </p>
        <h1 className="font-display text-3xl font-semibold mb-2">
          Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
        </h1>
        <p className="text-ink/60 mb-10">Role: {user?.role}</p>

        {user?.role === "STUDENT" && (
          <div className="bg-white border border-ink/10 rounded-2xl shadow-sm p-8">
            <h2 className="font-display text-xl font-semibold mb-2">
              Ready to see where you're headed?
            </h2>
            <p className="text-ink/60 text-sm mb-6 max-w-md">
              Take the career assessment to get your RIASEC profile and
              personalized, AI-explained career matches.
            </p>
            <Link
              to="/assessments/new"
              className="inline-block bg-gold text-ink px-6 py-3 rounded-full font-medium hover:bg-teal hover:text-paper transition"
            >
              Take career assessment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

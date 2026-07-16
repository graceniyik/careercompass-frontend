import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerStudent } from "../../api/auth";
import { Navbar } from "../../components/Navbar";
import axios from "axios";

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await registerStudent({ email, password, fullName, institution });
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Registration failed.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <div className="flex items-center justify-center px-4 pt-16 pb-16">
        <div className="w-full max-w-md animate-fade-rise">
          <p className="font-mono text-xs tracking-widest text-teal uppercase mb-3 text-center">
            Chart your course
          </p>
          <h1 className="font-display text-3xl font-semibold text-center mb-8">
            Create your account
          </h1>

          <div className="bg-white border border-ink/10 rounded-2xl shadow-sm p-8">
            {error && (
              <div className="mb-4 p-3 bg-rust/10 text-rust text-sm rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-ink/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal bg-paper/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 border border-ink/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal bg-paper/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-ink/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal bg-paper/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-ink/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal bg-paper/40"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-ink py-2.5 rounded-full font-medium hover:bg-teal hover:text-paper transition disabled:opacity-50"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>
            <p className="text-sm text-ink/50 mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

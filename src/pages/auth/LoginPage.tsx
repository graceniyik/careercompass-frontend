import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Navbar } from "../../components/Navbar";
import axios from "axios";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const justRegistered = (location.state as { registered?: boolean })
    ?.registered;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Login failed.");
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
      <div className="flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-md animate-fade-rise">
          <p className="font-mono text-xs tracking-widest text-teal uppercase mb-3 text-center">
            Welcome back
          </p>
          <h1 className="font-display text-3xl font-semibold text-center mb-8">
            Log in to your account
          </h1>

          <div className="bg-white border border-ink/10 rounded-2xl shadow-sm p-8">
            {justRegistered && (
              <div className="mb-4 p-3 bg-teal/10 text-teal text-sm rounded-lg">
                Account created successfully — please log in.
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-rust/10 text-rust text-sm rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </form>
            <p className="text-sm text-ink/50 mt-6 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-teal font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

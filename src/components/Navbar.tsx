import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="border-b border-ink/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-ink"
        >
          CareerCompass<span className="text-gold">.</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-ink/70 hover:text-teal transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-ink/70 hover:text-rust transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-ink/70 hover:text-teal transition"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-gold text-ink px-4 py-2 rounded-full hover:bg-teal hover:text-paper transition"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

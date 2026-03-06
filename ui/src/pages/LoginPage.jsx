import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleGoogleCredential = async (response) => {
    if (!response?.credential) return;
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/google", { credential: response.credential });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email || "");
      localStorage.setItem("userId", res.data.userId);
      onLogin(res.data.email || "");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Google sign-in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleButtonRef.current) return;
    const initGoogle = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredential,
        });
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          type: "standard",
          theme: "filled_black",
          size: "large",
          width: 320,
          text: "signin_with",
        });
      }
    };
    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      const t = setInterval(() => {
        if (window.google?.accounts?.id) {
          initGoogle();
          clearInterval(t);
        }
      }, 100);
      return () => clearInterval(t);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Store token and user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);

      localStorage.setItem("userId", response.data.userId);

      // Call onLogin callback
      onLogin(email);
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🛡</span>
            </div>
            <h1 className="text-2xl font-bold text-white">StockGuard</h1>
          </div>
          <p className="text-purple-300">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 shadow-xl border border-purple-500/20">
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Sign in with Google - click to show email picker, then direct login */}
          {GOOGLE_CLIENT_ID ? (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-gray-400 text-sm mb-2">or</p>
              <div ref={googleButtonRef} />
            </div>
          ) : (
            <p className="mt-4 text-center text-gray-500 text-xs">
              Set VITE_GOOGLE_CLIENT_ID in .env for Google sign-in
            </p>
          )}

          {/* Back to Landing */}
          <div className="mt-4 text-center">
            <a href="/" className="text-purple-400 hover:text-purple-300 text-sm">
              ← Back to Home
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
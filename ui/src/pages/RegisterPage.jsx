import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function RegisterPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Call Backend Signup
      const response = await api.post("/auth/signup", formData);

      // 2. Store Token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", formData.email);

      // 3. Update App State & Redirect
      onLogin(formData.email);
      navigate("/dashboard");
      
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🛡️</span>
            <h1 className="text-2xl font-bold text-white">StockGuard</h1>
          </div>
          <p className="text-purple-300">Start your 14-day free trial</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 shadow-xl border border-purple-500/20">
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
            <input
              name="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="My Awesome Store"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="you@company.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="mt-4 text-center">
            <span className="text-gray-400 text-sm">Already have an account? </span>
            <Link to="/login" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
        role,
      });
      login(data.token, data.user);
      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/student", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse delay-1000"></div>

      <div className="glass-card w-full max-w-[380px] z-10 relative">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-1 tracking-wide">Welcome back</h2>
          <p className="text-xs text-slate-400">Login to manage your complaints.</p>
        </div>

        {location.state?.message && (
          <div className="mb-4 text-emerald-400 text-xs text-center font-medium bg-emerald-500/10 border border-emerald-500/20 py-2 rounded-lg">
            {location.state.message}
          </div>
        )}
        
        {error && (
          <div className="mb-4 text-rose-400 text-xs text-center font-medium bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs text-slate-300 mb-1.5 font-medium">Select Role</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  role === "student"
                    ? "bg-blue-600/80 text-white shadow-sm"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                  role === "admin"
                    ? "bg-blue-600/80 text-white shadow-sm"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1 font-medium">Email</label>
            <input
              type="email"
              className="glass-input"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs text-slate-300 font-medium">Password</label>
              <Link to="/forgot-password" className="text-[10px] sm:text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              className="glass-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn mt-2"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs">
          <span className="text-slate-400">New here? </span>
          <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

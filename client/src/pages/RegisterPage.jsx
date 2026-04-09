import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api.js";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        department,
        role,
      });
      navigate("/login", {
        replace: true,
        state: { message: "Registration successful. Please log in." },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse delay-1000"></div>

      <div className="glass-card w-full max-w-[380px] z-10 relative">
        <div className="text-center mb-5">
          <h2 className="text-xl font-bold text-white mb-1 tracking-wide">Create account</h2>
          <p className="text-xs text-slate-400">Join our modern platform today.</p>
        </div>
        
        {error && (
          <div className="mb-4 text-rose-400 text-xs text-center font-medium bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs text-slate-300 mb-1 font-medium">Role</label>
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
            <label className="block text-xs text-slate-300 mb-1 font-medium">Name</label>
            <input
              type="text"
              className="glass-input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1 font-medium">Password</label>
              <input
                type="password"
                className="glass-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1 font-medium whitespace-nowrap">Department</label>
              <input
                type="text"
                className="glass-input"
                placeholder="Ex. CS / IT"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn mt-2"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-5 text-center text-xs">
          <span className="text-slate-400">Already a member? </span>
          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

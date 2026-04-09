import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      // Assuming a backend route /auth/forgot-password exists
      // await api.post("/auth/forgot-password", { email });
      
      // Simulating API call for now
      await new Promise((res) => setTimeout(res, 1000));
      
      setMessage("If an account exists, a reset link has been sent.");
      setEmail("");
    } catch (err) {
      setError("Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60"></div>

      <div className="glass-card w-full max-w-[380px] z-10 relative">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-1 tracking-wide">Reset Password</h2>
          <p className="text-xs text-slate-400">Enter your email to receive recovery instructions.</p>
        </div>

        {message && (
          <div className="mb-4 text-emerald-400 text-xs text-center font-medium bg-emerald-500/10 border border-emerald-500/20 py-2 rounded-lg">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-4 text-rose-400 text-xs text-center font-medium bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1 font-medium">Email Address</label>
            <input
              type="email"
              className="glass-input"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn mt-2"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs">
          <span className="text-slate-400">Remember your password? </span>
          <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

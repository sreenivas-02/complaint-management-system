import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse delay-1000"></div>

      <div className="glass-card w-full max-w-[420px] z-10 relative text-center">
        <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">Complaint Management</h1>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          A modern, unified platform designed to help you easily manage and track college complaints.
        </p>

        <Link 
          to="/login"
          className="inline-block primary-btn text-xs px-8 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

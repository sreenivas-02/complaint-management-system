import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const title =
    location.pathname.includes("/admin") || user?.role === "admin"
      ? "Admin Dashboard"
      : "Student Dashboard";

  return (
    <div className="h-screen flex bg-slate-950 text-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-800 bg-slate-900/50">
          <div>
            <h1 className="text-xl font-bold text-slate-50">
              {title}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Welcome, {user?.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* The user screenshot shows "Light mode" and "Logout" white buttons */}
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-slate-200 text-slate-900 font-medium px-4 py-1.5 rounded text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto w-full max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

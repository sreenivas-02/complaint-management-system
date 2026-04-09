import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  HomeIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  UserCircleIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isAdmin = user?.role === "admin";

  const studentLinks = [
    { to: "/student", label: "Dashboard", icon: HomeIcon },
    { to: "/student/raise", label: "Raise Complaint", icon: PlusCircleIcon },
    { to: "/student/complaints", label: "My Complaints", icon: DocumentTextIcon },
    { to: "/student/profile", label: "Profile", icon: UserCircleIcon },
  ];

  const adminLinks = [
    { to: "/admin", label: "Dashboard", icon: HomeIcon },
    { to: "/admin/complaints", label: "Manage Complaints", icon: DocumentTextIcon },
    { to: "/admin/students", label: "Students", icon: UsersIcon },
    { to: "/admin/reports", label: "Reports & Analytics", icon: ChartBarIcon },
    { to: "/admin/profile", label: "Profile", icon: UserCircleIcon },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col z-30h-full">
      <div className="px-6 py-6 border-b border-slate-800">
        <h2 className="text-lg font-bold text-slate-50">
          Complaint Manager
        </h2>
        <p className="text-xs text-slate-400 mt-1 pb-1">
          {isAdmin ? "Administrator" : "Student"} panel
        </p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = location.pathname === link.to;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? "bg-slate-800 text-slate-50 font-medium"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

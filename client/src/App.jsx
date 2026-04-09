import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import RaiseComplaintPage from "./pages/student/RaiseComplaintPage.jsx";
import MyComplaintsPage from "./pages/student/MyComplaintsPage.jsx";
import ComplaintDetailsPage from "./pages/shared/ComplaintDetailsPage.jsx";
import ProfilePage from "./pages/shared/ProfilePage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageComplaintsPage from "./pages/admin/ManageComplaintsPage.jsx";
import ManageStudentsPage from "./pages/admin/ManageStudentsPage.jsx";
import ReportsPage from "./pages/admin/ReportsPage.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute roles={["student"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="raise" element={<RaiseComplaintPage />} />
          <Route path="complaints" element={<MyComplaintsPage />} />
          <Route path="complaints/:id" element={<ComplaintDetailsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="complaints" element={<ManageComplaintsPage />} />
          <Route path="complaints/:id" element={<ComplaintDetailsPage />} />
          <Route path="students" element={<ManageStudentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;


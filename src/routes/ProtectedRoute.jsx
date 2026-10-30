import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AdminSplash } from "../components/admin/ui";

const ProtectedRoute = ({ children }) => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "checking") return <AdminSplash />;
  if (status !== "authenticated") {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    );
  }
  return children;
};

export default ProtectedRoute;

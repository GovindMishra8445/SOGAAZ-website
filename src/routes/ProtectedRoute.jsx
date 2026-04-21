import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("admin");

  return isAuth === "true" ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
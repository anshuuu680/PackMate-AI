import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // Assume you store a token or auth flag in localStorage
  const isAuthenticated = localStorage.getItem("token"); // or "isAuthenticated"

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default PrivateRoute;

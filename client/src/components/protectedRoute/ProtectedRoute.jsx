import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="p-10! flex justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    sessionStorage.setItem("origin", location.pathname);
    return <Navigate to={`/login?origin=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}

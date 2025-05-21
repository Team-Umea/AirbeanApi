import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AccessRedirect = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoading = useSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return (
      <div className="p-10! flex justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (isAuthenticated && !isLoading) {
    return <Navigate to={isAdmin ? "/admin" : "/profil"} />;
  }

  return <>{children}</>;
};

export default AccessRedirect;

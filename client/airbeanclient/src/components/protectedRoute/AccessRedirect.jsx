import { useSelector } from "react-redux";
import { getQueryParams } from "../../lib/utitls";
import { Navigate } from "react-router-dom";

const AccessRedirect = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const origin = getQueryParams(location).get("origin");

  if (isAuthenticated) {
    if (origin) {
      return null;
    }

    return isAdmin ? <Navigate to="/admin" /> : <Navigate to="/profil" />;
  }

  return children;
};

export default AccessRedirect;

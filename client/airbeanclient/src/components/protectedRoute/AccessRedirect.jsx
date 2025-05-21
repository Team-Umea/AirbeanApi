import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getQueryParams } from "../../lib/utitls";

const AccessRedirect = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const origin = getQueryParams(location).get("origin");

  if (isAuthenticated) {
    if (origin) {
      return <Navigate to={origin} />;
    }
    return isAdmin ? <Navigate to="/admin" /> : <Navigate to="/profil" />;
  }

  return children;
};

export default AccessRedirect;

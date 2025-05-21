import { useSelector } from "react-redux";
import { getQueryParams } from "../../lib/utitls";
import { Navigate } from "react-router-dom";

const AccessRedirect = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const origin = getQueryParams(location).get("origin");

  if (isAuthenticated) {
    if (origin) {
      return null;
    }

    return <Navigate to="/profil" />;
  }

  return children;
};

export default AccessRedirect;

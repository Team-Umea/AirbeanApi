import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PREV_PAGE = sessionStorage.getItem("pathname");

const AccessRedirect = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (isAuthenticated) {
    if (PREV_PAGE) {
      return <Navigate to={PREV_PAGE} />;
    }
    return isAdmin ? <Navigate to="/admin" /> : <Navigate to="/profil" />;
  }

  return children;
};

export default AccessRedirect;

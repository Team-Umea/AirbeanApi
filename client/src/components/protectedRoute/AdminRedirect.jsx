import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRedirect = ({ children }) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
};

export default AdminRedirect;

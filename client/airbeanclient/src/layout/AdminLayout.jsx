import { Navigate, Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;

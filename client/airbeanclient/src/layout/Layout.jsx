import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getQueryParams } from "../lib/utitls";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPathRef = useRef(location.pathname);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch({ type: "AUTHENTICATE" });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const origin = sessionStorage.getItem("origin");

      if (origin && origin !== location.pathname) {
        sessionStorage.removeItem("origin");
        navigate(origin, { replace: true });
      }
    }
  }, [location.pathname]);

  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
          duration: 5000,
        }}
        richColors
      />
    </div>
  );
}

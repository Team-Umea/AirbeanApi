import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch({ type: "AUTHENTICATE" });
    dispatch({ type: "PRODUCTS" });
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
    <div className="layout-wrapper bg-amber-100 overflow-x-hidden! max-w-screen">
      <Navbar />
      <main className="main-content min-h-screen">
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
      <Footer />
    </div>
  );
}

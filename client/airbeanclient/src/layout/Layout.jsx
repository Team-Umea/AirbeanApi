import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "AUTHENTICATE" });
    dispatch({ type: "PRODUCTS" });
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    navigate(`${pathname}?origin=${pathname}`, { replace: true });
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

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../components/utils/Modal";
import { getQueryParams } from "../lib/utitls";

export default function Layout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "AUTHENTICATE" });
    dispatch({ type: "PRODUCTS" });
  }, []);

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
      <Modal />
      <Footer />
    </div>
  );
}

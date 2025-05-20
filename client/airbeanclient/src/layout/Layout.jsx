import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { Toaster } from "sonner";

export default function Layout() {
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

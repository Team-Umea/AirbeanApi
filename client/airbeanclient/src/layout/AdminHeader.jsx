import { useSelector } from "react-redux";
import GhostButton from "../components/btn/GhostButton";
import { ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);

  const isAdminPage = pathname.endsWith("admin") || pathname.endsWith("amdin/");
  const isDiscountPage = pathname.includes("rabatter");
  const isProductsPage = pathname.includes("produkter");

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 p-6 pt-10 lg:p-8!">
      <div className="">
        <p className="text-xl font-semibold text-amber-700">Välkommen {username}!</p>
        <p className="text-lg font-semibold text-gray-700">{email}</p>
        <p className="text-gray-600">Inloggad som admin</p>
      </div>
      <div className="lg:ml-12 flex gap-x-2 lg:gap-x-12 w-fit overflow-x-auto">
        {!isAdminPage && (
          <GhostButton onClick={() => navigate("/admin")}>
            <span className="text-lg font-semibold">Översikt</span>
            <ChevronRight absoluteStrokeWidth />
          </GhostButton>
        )}
        {!isProductsPage && (
          <GhostButton onClick={() => navigate("/admin/produkter")}>
            <span className="text-lg font-semibold">Produkter</span>
            <ChevronRight absoluteStrokeWidth />
          </GhostButton>
        )}
        {!isDiscountPage && (
          <GhostButton onClick={() => navigate("/admin/rabatter")}>
            <span className="text-lg font-semibold">Kampanjer</span>
            <ChevronRight absoluteStrokeWidth />
          </GhostButton>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;

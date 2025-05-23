import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/btn/PrimaryButton";
import { Navigate, useNavigate } from "react-router-dom";
import { clearAuth } from "../store/authSlice";
import Orderstatus from "../components/orderstatus/Orderstatus";
import OrderHistory from "../components/orderhistory/orderhistory";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const Profil = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout error:", error);
    }
    dispatch(clearAuth());
    navigate("/");
  };

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <div className="m-auto flex flex-col items-center justify-center">
        <Orderstatus />
        <OrderHistory />
        <PrimaryButton
          className={"max-w-fit m-auto mt-4"}
          onClick={handleLogOut}
        >
          Logga ut
        </PrimaryButton>
      </div>
    </>
  );
};

export default Profil;

import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/btn/PrimaryButton";
import { Navigate, useNavigate } from "react-router-dom";
import { clearAuth } from "../store/authSlice";
import Orderstatus from "./Orderstatus";

const Profil = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
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
        <h2>Orderhistorik</h2>
        <PrimaryButton className={"max-w-fit m-auto"} onClick={handleLogOut}>
          Logga ut
        </PrimaryButton>
      </div>
    </>
  );
};

export default Profil;

import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../components/btn/PrimaryButton";
import { Navigate, useNavigate } from "react-router-dom";
import { clearAuth } from "../store/authSlice";

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
      <div className="profil-page">
        <h2>Min Profil</h2>
        <p>Dina ordrar:</p>
        <PrimaryButton onClick={handleLogOut}>Logga ut</PrimaryButton>
      </div>
    </>
  );
};

export default Profil;

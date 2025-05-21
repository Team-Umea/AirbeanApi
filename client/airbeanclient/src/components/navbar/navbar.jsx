import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import drone from "../../assets/drone.svg";

export default function Navbar() {
  const cartItemCount = 2;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="bg-[#4a2c2a] text-white py-4 px-8 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link
          to="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img src={drone} alt="AirBean Drone Logo" className="w-8 h-8 mr-3" />
          <h1 className="text-2xl font-bold">AirBean Coffee</h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/meny"
            className="ml-6 hover:text-yellow-400 transition-colors"
          >
            Meny
          </Link>
          <Link
            to="/about"
            className="ml-6 hover:text-yellow-400 transition-colors"
          >
            Vårt kaffe
          </Link>
          <Link
            to="/profil"
            className="ml-6 hover:text-yellow-400 transition-colors"
          >
            Min profil
          </Link>
          <Link
            to="/orderstatus"
            className="ml-6 hover:text-yellow-400 transition-colors"
          >
            Orderstatus
          </Link>
          {isAuthenticated && (
            <Link
              to="/register"
              className="ml-6 hover:text-yellow-400 transition-colors"
            >
              Skapa konto
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/login"
              className="ml-6 hover:text-yellow-400 transition-colors"
            >
              Logga in
            </Link>
          )}
          <Link
            to="/cart"
            className="relative inline-flex items-center ml-6 group"
          >
            <FaShoppingCart
              size={20}
              className="transition-transform group-hover:scale-110"
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold leading-none">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

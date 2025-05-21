import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import drone from "../../assets/drone.svg";

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartItemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const navLinks = (
    <>
      <Link
        to="/meny"
        className="hover:text-yellow-400 transition-colors"
        onClick={() => setMenuOpen(false)}
      >
        Meny
      </Link>
      <Link
        to="/about"
        className="hover:text-yellow-400 transition-colors"
        onClick={() => setMenuOpen(false)}
      >
        Vårt kaffe
      </Link>
      <Link
        to="/profil"
        className="hover:text-yellow-400 transition-colors"
        onClick={() => setMenuOpen(false)}
      >
        Min profil
      </Link>
      <Link
        to="/orderstatus"
        className="hover:text-yellow-400 transition-colors"
        onClick={() => setMenuOpen(false)}
      >
        Orderstatus
      </Link>
      {isAuthenticated && (
        <Link
          to="/register"
          className="hover:text-yellow-400 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Skapa konto
        </Link>
      )}
      {isAuthenticated && (
        <Link
          to="/login"
          className="hover:text-yellow-400 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Logga in
        </Link>
      )}
    </>
  );

  const cartLink = (
    <Link
      to="/cart"
      className="relative inline-flex items-center group"
      onClick={() => setMenuOpen(false)}
      aria-label="Kundvagn"
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
  );

  // Lägg till denna variant för overlay-cartLink:
  const overlayCartLink = (
    <Link
      to="/cart"
      className="relative inline-flex items-center group"
      onClick={() => setMenuOpen(false)}
      aria-label="Kundvagn"
    >
      <FaShoppingCart
        size={36} // Större ikon i overlayen
        className="transition-transform group-hover:scale-110"
      />
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold leading-none">
          {cartItemCount}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="bg-[#4a2c2a] text-white py-4 px-8 shadow-md relative z-50">
      {/* Hamburger-knapp */}
      <button
        className="fixed top-4 left-4 z-50 w-16 h-16 rounded-full border-gray-950/40 border-1 bg-[#4a2c2a] flex items-center justify-center shadow-lg md:hidden"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Öppna meny"
        type="button"
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className="relative flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex justify-center md:justify-start w-full md:w-auto">
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src={drone}
              alt="AirBean Drone Logo"
              className="w-8 h-8 mr-3"
            />
            <h1 className="text-2xl font-bold">AirBean Coffee</h1>
          </Link>
        </div>
        {/* Desktop-länkar */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navLinks}
          {/* Kundvagn desktop */}
          <span className="hidden md:inline-flex">{cartLink}</span>
        </div>
        {/* Kundvagn mobil */}
        <div className="flex-1 flex justify-end md:hidden">{cartLink}</div>
      </div>

      {/* Mobilmeny overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#4a2c2a] bg-opacity-95 flex flex-col items-center justify-center gap-4 text-3xl md:hidden z-40 w-full">
          <div className="fixed top-4 right-4 p-4 z-50">{overlayCartLink}</div>
          <div className="flex flex-col w-3/4">
            {[
              <Link
                key="meny"
                to="/meny"
                className="hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Meny
              </Link>,
              <Link
                key="about"
                to="/about"
                className="hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Vårt kaffe
              </Link>,
              <Link
                key="profil"
                to="/profil"
                className="hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Min profil
              </Link>,
              <Link
                key="orderstatus"
                to="/orderstatus"
                className="hover:text-yellow-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Orderstatus
              </Link>,
              isAuthenticated && (
                <Link
                  key="register"
                  to="/register"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Skapa konto
                </Link>
              ),
              isAuthenticated && (
                <Link
                  key="login"
                  to="/login"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Logga in
                </Link>
              ),
            ]
              .filter(Boolean)
              .map((link, i) => (
                <div
                  key={i}
                  className="border-b border-white w-full text-center pb-6 pt-6"
                >
                  {link}
                </div>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}

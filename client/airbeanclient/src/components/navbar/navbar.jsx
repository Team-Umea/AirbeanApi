import { Link } from "react-router-dom";
import "../../components/navbar/navbar.css";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const cartItemCount = 2; // redux-lösning för denna sen.

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Kaffe.com</h1>
        <div className="navbar-links">
          <Link to="/">Meny</Link>
          <Link to="/about">Vårt kaffe</Link>
          <Link to="/profil">Min profil</Link>
          <Link to="/orderstatus">Orderstatus</Link>
          {isAuthenticated && <Link to="/register">Skapa konto</Link>}
          {isAuthenticated && <Link to="/login">Logga in</Link>}
        </div>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import "../../components/navbar/navbar.css";
import { useSelector } from "react-redux";

export default function Navbar() {
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
          {!isAuthenticated && <Link to="/register">Skapa konto</Link>}
          {!isAuthenticated && <Link to="/login">Logga in</Link>}
        </div>
      </div>
    </nav>
  );
}

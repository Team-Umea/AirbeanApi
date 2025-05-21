import { Link } from "react-router-dom";
import "../../components/navbar/navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Navbar() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const cartItemCount = useSelector((state) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Kaffe.com</h1>
        <div className="navbar-links">
          <Link to="/meny">Meny</Link>
          <Link to="/about">Vårt kaffe</Link>
          <Link to="/profil">Min profil</Link>
          <Link to="/orderstatus">Orderstatus</Link>
          {isAuthenticated && <Link to="/register">Skapa konto</Link>}
          {isAuthenticated && <Link to="/login">Logga in</Link>}
          <Link to="/cart" className="cart-link">
            <FaShoppingCart size={20} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import '../../components/navbar/navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
        <div className="navbar-container">
            <h1 className="navbar-logo">Kaffe.com</h1>
            <div className="navbar-links">
            <Link to="/">Meny</Link>
            <Link to="/about">Vårt kaffe</Link>
            <Link to="/profil">Min profil</Link>
            <Link to="/orderstatus">Orderstatus</Link>
            </div>
        </div>
        </nav>
    );
}

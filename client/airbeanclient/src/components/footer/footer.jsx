import { Link } from "react-router-dom";
import drone from "../../assets/drone.svg";

const Footer = () => (
  <footer
    className="text-white py-6 mt-12"
    style={{ backgroundColor: "#1a0e0d" }}
  >
    <div className="container mx-auto px-4 flex flex-col items-center gap-6 lg:grid lg:grid-cols-3 lg:items-center">
      <div className="flex items-center justify-center lg:justify-start">
        <Link
          to="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img
            src={drone}
            alt="AirBean Drone Logo"
            className="w-10 h-10 mr-3"
          />
          <span className="font-bold text-xl tracking-wide">
            AirBean Coffee
          </span>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm text-center">
          © {new Date().getFullYear()} AirBean. Alla rättigheter förbehållna.
        </p>
        <p className="text-xs mt-1 text-center">
          Levererat med kärlek & drönare
        </p>
      </div>
      <nav className="flex justify-center lg:justify-end">
        <ul className="flex flex-col md:flex-row gap-4 text-sm items-center">
          <li>
            <Link
              to="/"
              className="hover:underline underline-offset-4 hover:text-yellow-400 transition-colors"
            >
              Meny
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:underline underline-offset-4 hover:text-yellow-400 transition-colors"
            >
              Vårt kaffe
            </Link>
          </li>
          <li>
            <Link
              to="/profil"
              className="hover:underline underline-offset-4 hover:text-yellow-400 transition-colors"
            >
              Profil
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="hover:underline underline-offset-4 hover:text-yellow-400 transition-colors"
            >
              Kundvagn
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;

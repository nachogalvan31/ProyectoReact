import CartWidget from "../cartWidget/CartWidget";
import "./navbar.css";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div>
      <>
      <div className="navbarContainer">
      <Link style={{ color: "beige" }} to="/">
           El Rincon Del Vago
          </Link>
          <ul className="categories">
          <Link to="/">Juegos</Link>
          <Link to="/category/PS3">PS3</Link>
          <Link to="/category/PS4">PS4</Link>
          <Link to="/category/PS5">PS5</Link>
          <Link to="/category/XBOX-360">XBOX-360</Link>
          <Link to="/category/XBOX-ONE">XBOX-ONE</Link>
        </ul>
        <CartWidget />
      </div>
    </>
  </div>
);
};
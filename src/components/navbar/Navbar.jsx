import CartWidget from "../cartWidget/CartWidget";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbarContainer">
     
      <h2>El Rincon del Vago</h2>

      <div className='container-juegos'>
      <ul style={{ display: "flex", gap: "25px"}}>
        <li><span style={{ cursor: "pointer" }} onClick={() => handleItemClick("Juegos")}>Juegos</span></li>
        <li><span style={{ cursor: "pointer" }} onClick={() => handleItemClick("PS3")}>PS3</span></li>
        <li><span style={{ cursor: "pointer" }} onClick={() => handleItemClick("PS4")}>PS4</span></li>
        <li><span style={{ cursor: "pointer" }} onClick={() => handleItemClick("XBOX 360")}>XBOX 360</span></li>
        <li><span style={{ cursor: "pointer" }} onClick={() => handleItemClick("XBOX ONE")}>XBOX ONE</span></li>
      </ul>
      </div>
      
      <CartWidget/>

    
    </div>
  );
};
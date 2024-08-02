import { Button } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";
import "./cart.css";

const Cart = () => {

const { cart, clearCart, deleteProduct, getTotalPrice } =
useContext(CartContext);
let total = getTotalPrice(); 

const handleDelete = (id) => {
Swal.fire({
  title: "Seguro quieres eliminar?",
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: "si, borrar",
  denyButtonText: `no, no borrar`,
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire("Eliminado", "", "success");
    deleteProduct(id);
  } else if (result.isDenied) {
    Swal.fire("No se elimino", "", "info");
  }
});
};
 
return (
<div className="card-container">
  {cart.map((elemento) => {
    return (
      <div className="card-container2"
        key={elemento.id}
         
      > 
        <img src={elemento.img}
        width="280"
        height="380"
        /> 
         <h2 style={{ fontFamily: "monospace" }}>
              <span style={{ fontSize: "23px" }}>Nombre:</span> {elemento.title}
            </h2>
            <h2 style={{ fontFamily: "monospace" }}>
              <span style={{ fontSize: "23px" }}>Plataforma:</span> {elemento.category}
            </h2>
            <h2 style={{ fontFamily: "monospace" }}>
              <span style={{ fontSize: "23px" }}>Cantidad:</span>{" "}
              {elemento.quantity}
            </h2>
            <h2 style={{ fontFamily: "monospace" }}>
              <span style={{ fontSize: "23px" }}>Precio:</span> ${elemento.price}.-
            </h2>
        
         
        
        
        <Button
          variant="contained"
        
          
onClick={() => handleDelete(elemento.id)}
>
  Eliminar
</Button>

</div>
);
})}
<h2 className="spacing-top" style={{ fontFamily: "monospace" }}>
  <span style={{ fontSize: "23px" }} className={cart.length > 0 ? "title" : "ocultar"}>
    El total a pagar es ${total}
  </span>
</h2>
{cart.length > 0 && <Button onClick={clearCart}>Limpiar carrito </Button>}


<Link to="/checkout">
<Button
variant="contained"
style={{
  backgroundColor: cart.length > 0 ? "blue" : "red",
}}
>
Finalizar compra
</Button>
</Link>
</div>
);
};
export default Cart;
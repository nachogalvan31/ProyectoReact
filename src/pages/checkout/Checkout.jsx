import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Checkout = () => {
  const navigate = useNavigate(); 

  const [user, setUser] = useState({ nombre: "", email: "", telefono: "" });
  const [errors, setErrors] = useState({ nombre: "", email: "", telefono: "" });
  const [generalError, setGeneralError] = useState("");
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(""); 
  
  let total = getTotalPrice();

  const validate = () => {
    let valid = true;
    const newErrors = { nombre: "", email: "", telefono: "" };

    // Validar nombre
    if (!user.nombre) {
      newErrors.nombre = "El nombre es obligatorio.";
      valid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email) {
      newErrors.email = "El email es obligatorio.";
      valid = false;
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "El email no es válido.";
      valid = false;
    }

    // Validar teléfono
    const phoneRegex = /^[0-9]+$/;
    if (!user.telefono) {
      newErrors.telefono = "El teléfono es obligatorio.";
      valid = false;
    } else if (!phoneRegex.test(user.telefono)) {
      newErrors.telefono = "El teléfono solo debe contener números.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) {
      setGeneralError("Por favor, corrija los errores en el formulario.");
    } else {
      setGeneralError("");
    }
    return valid;
  };


  const envioDeFormulario = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    let order = {
      buyer: user,
      items: cart,
      total: total,
    };

  let ordersCollection = collection(db, "orders");
  let productCollection = collection(db, "products");
  cart.forEach((elemento) => {
    let refDoc = doc(productCollection, elemento.id);
    updateDoc(refDoc, { stock: elemento.stock - elemento.quantity });
  });

  addDoc(ordersCollection, order)
      .then((res) => {
        setOrderId(res.id);
        Swal.fire({
          title: 'Gracias por tu compra!',
          text: `Tu ticket es ${res.id}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          clearCart();
          navigate("/");
        });
    })
    .catch((error) => {
      console.error("Error al enviar la orden: ", error);
      toast.error("Hubo un problema al procesar tu orden. Por favor, inténtalo de nuevo.");
    });
    };
    
    const capturarData = (event) => {
      setUser({ ...user, [event.target.name]: event.target.value });
    };

  return (
    <div>
      
        <form  onSubmit={envioDeFormulario}
          style={{
            margin: "50px",
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "20px",
          }}
        ><h3> Complete los datos</h3>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            onChange={capturarData}
            name="nombre"
            value={user.nombre}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre}</p>}
          
          <input
            type="text"
            placeholder="Ingresa tu email"
            name="email"
            onChange={capturarData}
            value={user.email}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          
          <input
            type="text"
            placeholder="Ingresa tu teléfono"
            name="telefono"
            onChange={capturarData}
            value={user.telefono}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          {errors.telefono && <p style={{ color: 'red' }}>{errors.telefono}</p>}
          
          {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#422C6D",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Comprar
          </button>
        </form>
      
</div>
  );
};

export default Checkout;
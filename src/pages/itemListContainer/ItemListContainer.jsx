import ItemList from "./itemList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemListContainer = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let productsCollection = collection(db, "products");
    let consulta = productsCollection;
    if (name) {
      consulta = query(productsCollection, where("category", "==", name));
    }

    let getProducts = getDocs(consulta);
    getProducts.then((res) => {
      let arrayValido = res.docs.map((product) => {
        return { ...product.data(), id: product.id };
      }); // []
      setItems(arrayValido);
    });
  }, [name]);

     if (items.length === 0) {
     return (
       <div
         style={{
           width: "100%",
           display: "flex",
           marginTop: "300px",
         justifyContent: "center",
         }}
       >
         <PacmanLoader color="#422C6D" size={70} />
       </div>
     );
   }
    // const addProducts = () => {
  //   let productsCollection = collection(db, "products");

  //   products.forEach((elemento) => {
  //     addDoc(productsCollection, elemento);
  //   });
  // };

  return(
    <div>
       {/* <Button variant="contained" onClick={addProducts}>
        Agregar productos
      </Button> */}
   <ItemList items={items} />;
   {/* {items.length === 0 ? <h1>Cargando.....</h1> : <ItemList items={items} />} */}
   </div>
  );
};

export default ItemListContainer;

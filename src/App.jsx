import ItemListContainer from "./pages/itemListContainer/ItemListContainer";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  return ( <div>
    <Navbar/>
    <ItemListContainer greeting={"Bienvenido"} />
  </div>
  );
}
export default App;
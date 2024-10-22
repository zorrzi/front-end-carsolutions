import "./App.css";
import Header from "../../components/Header";
import FundoInicial from "../../components/FundoInicial";
import Formulario from "../../components/Formulario";
import Footer from "../../components/Footer";
import CatalogoCarrosCliente from "../../components/CatalogoCarrosCliente";

function App() {
  return (
    <div>
      <Header />
      <div className="image-container">
        <FundoInicial />
        <Formulario />
      </div>
      <h1 className="destaques">Destaques</h1>
      <div className="carros-container">
        <CatalogoCarrosCliente />
      </div>
      
      <Footer />

    </div>
    

  );
}

export default App;
import "./App.css";
import Header from "../../components/Header";
import FundoInicial from "../../components/FundoInicial";
import Formulario from "../../components/Formulario";
import Footer from "../../components/Footer";
import CatalogoCarros from "../../components/CatalogoCarros";

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
        <CatalogoCarros />
      </div>
      
      <Footer />

    </div>
    

  );
}

export default App;
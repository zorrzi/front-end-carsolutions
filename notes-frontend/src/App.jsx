import "./App.css";
import Header from "./components/Header";
import Fundo from "./components/Fundo";
import Formulario from "./components/Formulario";
import Footer from "./components/Footer";
import Carro from "./components/Carro";

function App() {
  return (
    <div>
      <Header />
      <div className="image-container">
        <Fundo />
        <Formulario />
        
      </div>
      <h1 className="destaques">Destaques</h1>
      <div className="carros-container">
        <Carro />
      </div>
      
      <Footer />

    </div>
    

  );
}

export default App;
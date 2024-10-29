import "./App.css";
import Header from "../../components/Header";
import FundoInicial from "../../components/FundoInicial";
import Formulario from "../../components/Formulario";
import Footer from "../../components/Footer";
import Destaques from "../../components/Destaques";
import BotaoChat from "../../components/BotaoChat";
import ChatCliente from "../../components/ChatCliente";
import { useState } from "react";
import ComoFunciona from "../../components/ComoFunciona";
import FeedbackClientes from "../../components/FeedbackClientes";
import Carrossel from "../../components/Carrossel";


const featuredCars = [
  {
    image: "kicks.png",
    name: 'Nissan Kicks',
    description: 'Um carro incrível para todas as ocasiões.',
    price: 'R$ 50.000'
  },
  {
    image: 'honda-civic.png',
    name: 'Honda Civic',
    description: 'Perfeito para aventuras urbanas e viagens.',
    price: 'R$ 60.000'
  },
  {
    image: 't-cross.png',
    name: 'Volkswagen T-Cross',
    description: 'Elegante, confortável e com excelente desempenho.',
    price: 'R$ 70.000'
  }
];


function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // Define o estado para abrir/fechar o chat
  return (
    <div>
      <Header />
      <div className="image-container">
        <FundoInicial />
        <Formulario />
      </div>
      <h1 className="destaques">Destaques</h1>
      <div className="carros-container">
        <Carrossel featuredCars={featuredCars} />
      </div>

      <ComoFunciona />
      <FeedbackClientes />
      
      <div>
      <BotaoChat setIsChatOpen={setIsChatOpen} /> {/* Passa setIsChatOpen como prop */}
      <ChatCliente isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} /> {/* Passa isChatOpen e setIsChatOpen */}
      </div>

      <Footer />

    </div>
    

  );
}

export default App;
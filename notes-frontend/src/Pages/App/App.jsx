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
    image: "/1.png"
  },
  {
    image: '/2.png'
  },
  {
    image: '/3.png'
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
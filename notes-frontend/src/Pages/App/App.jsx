import "./App.css";
import Header from "../../components/Header";
import FundoInicial from "../../components/FundoInicial";
import Formulario from "../../components/Formulario";
import Footer from "../../components/Footer";
import Destaques from "../../components/Destaques";
import BotaoChat from "../../components/BotaoChat";
import ChatCliente from "../../components/ChatCliente";
import { useState, useEffect } from "react";
import ComoFunciona from "../../components/ComoFunciona";
import FeedbackClientes from "../../components/FeedbackClientes";
import Carrossel from "../../components/Carrossel";

const featuredCars1 = [
  {
    image: "/11.png"
  },
  {
    image: '/21.png'
  },
  {
    image: '/31.png'
  }
];

const featuredCars2 = [
  {
    image: "/12.png"
  },
  {
    image: '/22.png'
  },
  {
    image: '/32.png'
  }
];

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // Define o estado para abrir/fechar o chat
  const [featuredCars, setFeaturedCars] = useState(featuredCars1); // Estado para o carrossel de carros

  // Atualiza featuredCars com base na largura da tela
  useEffect(() => {
    const updateFeaturedCars = () => {
      if (window.innerWidth < 560) {
        setFeaturedCars(featuredCars2);
      } else {
        setFeaturedCars(featuredCars1);
      }
    };

    updateFeaturedCars(); // Chamada inicial para definir o valor correto

    window.addEventListener("resize", updateFeaturedCars); // Listener para monitorar mudanças de tamanho

    return () => window.removeEventListener("resize", updateFeaturedCars); // Limpeza do listener
  }, []);

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

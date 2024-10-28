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
        <Destaques />
      </div>

      
      <div>
      <BotaoChat setIsChatOpen={setIsChatOpen} /> {/* Passa setIsChatOpen como prop */}
      <ChatCliente isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} /> {/* Passa isChatOpen e setIsChatOpen */}
      </div>

      <Footer />

    </div>
    

  );
}

export default App;
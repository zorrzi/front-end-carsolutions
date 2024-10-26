// BotaoChat.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function BotaoChat({ setIsChatOpen }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChatClick = () => {
    if (token) {
      setIsChatOpen(true); // Abre o chat ao clicar
    } else {
      navigate('/logincliente'); // Redireciona para login se não estiver logado
    }
  };

  return (
    <button 
      onClick={handleChatClick} 
      alt="Abrir Chat" 
      className="botao-chat"
    >
        <img className='icon-chat' src="/bater-papo.png" alt="Chat" />
    </button>
  );
}

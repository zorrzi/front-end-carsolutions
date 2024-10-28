// components/chat/MessageInput.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './MessageInput.css';


export default function MessageInput({ chatId, isEmployee, onMessageSent }) {
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (event) => {
    const token = localStorage.getItem('token');
    event.preventDefault();
    axios.post(`http://127.0.0.1:8000/chat/send/${chatId}/`, 
      { 
        content: message, 
        is_employee: isEmployee 
      }, 
      {
        headers: {
            'Authorization': `Token ${token}`
        }
      })
      .then(() => {
        setMessage('');  // Limpa o campo de entrada após o envio
        onMessageSent();  // Chama a função para recarregar mensagens
      })
      .catch((error) => console.error("Erro ao enviar a mensagem:", error));
  };

  return (
    <form className='input-msg' onSubmit={handleSendMessage}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua mensagem"
        required
      />
      <button className='enviar' type="submit">Enviar</button>
    </form>
  );
}

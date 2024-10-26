// components/chat/MessageInput.jsx

import React, { useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function MessageInput({ chatId, isEmployee, onMessageSent }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = (event) => {
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
    <form onSubmit={handleSendMessage}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua mensagem"
        required
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

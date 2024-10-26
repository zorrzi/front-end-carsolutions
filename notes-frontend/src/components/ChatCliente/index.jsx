// components/chat/ClientChat.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageInput from '../MessageInput/MessageInput';

// Obtém o token do localStorage
const token = localStorage.getItem('token');

export default function ChatCliente() {
  const [chat, setChat] = useState(null);       // Estado para armazenar o chat do cliente
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens

  // Carrega o chat e as mensagens do cliente ao montar o componente
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/chat/cliente/', {
      headers: {
        'Authorization': `Token ${token}`  // Adiciona o token no cabeçalho de autorização
      }
    })
    .then((response) => {
      // Verifica se response.data.chat existe
      if (response.data && response.data.chat) {
        print(response.data.chat);
        setChat(response.data.chat);
        setMessages(response.data.chat.messages || []); // Usa lista vazia como fallback
      }
    })
    .catch((error) => console.error("Erro ao buscar o chat do cliente:", error));
  }, []);

  // Recarrega as mensagens após o envio de uma nova mensagem
  const loadMessages = (chatId) => {
    axios.get(`http://127.0.0.1:8000/chat/cliente/${chatId}/`, {
      headers: {
        'Authorization': `Token ${token}`  // Adiciona o token no cabeçalho de autorização
      }
    })
    .then((response) => {
      setMessages(response.data.chat.messages);
    })
    .catch((error) => console.error("Erro ao carregar mensagens:", error));
  };

  // Função para iniciar um novo chat
  const iniciarChat = () => {
    axios.post('http://127.0.0.1:8000/chat/iniciar/', {}, {
      headers: {
        'Authorization': `Token ${token}`  // Adiciona o token no cabeçalho de autorização
      }
    })
    .then((response) => {
      if (response.data && response.data.chat) {
        setChat(response.data.chat);
        setMessages([]);  // Começa com chat vazio
      }
    })
    .catch((error) => console.error("Erro ao iniciar chat:", error));
  };

  return (
    <div>
      <h2>Seu Chat com a Empresa</h2>

      {/* Verifica se há um chat existente */}
      {chat ? (
        <div>
          {/* Exibe as mensagens do chat */}
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            {messages.length > 0 ? (
              messages.map((message) => (
                <p key={message.id}>
                  <strong>{message.is_employee ? 'Funcionário' : 'Você'}:</strong> {message.content}
                </p>
              ))
            ) : (
              <p>Sem mensagens ainda.</p>
            )}
          </div>

          {/* Componente para envio de novas mensagens */}
          <MessageInput chatId={chat.id} isEmployee={false} onMessageSent={() => loadMessages(chat.id)} />
        </div>
      ) : (
        <div>
          <p>Você não tem um chat ativo.</p>
          <button onClick={iniciarChat}>Iniciar Chat</button>
        </div>
      )}
    </div>
  );
}

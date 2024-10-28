// ChatCliente.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageInput from '../MessageInput/MessageInput';
import './index.css';

export default function ChatCliente({ isChatOpen, setIsChatOpen }) {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isChatOpen && token) {
      axios.get('http://127.0.0.1:8000/chat/cliente/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        if (response.data && response.data.chat) {
          setChat(response.data.chat);
          setMessages(response.data.chat.messages || []);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Chat não encontrado; não exibir erro, apenas definir chat como null
          setChat(null);
        } else {
          console.error("Erro ao buscar o chat do cliente:", error);
        }
      });
    }
  }, [isChatOpen]);

  // Função para recarregar as mensagens do chat
  const loadMessages = (chatId) => {
    const token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/chat/cliente/${chatId}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then((response) => {
      if (response.data && response.data.chat) {
        setMessages(response.data.chat.messages || []);
      }
    })
    .catch((error) => console.error("Erro ao carregar mensagens:", error));
  };

  // Função para iniciar o chat
  const iniciarChat = () => {
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:8000/chat/iniciar/', {}, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then((response) => {
      if (response.data && response.data.chat) {
        setChat(response.data.chat);
        setMessages([]); // Começa com chat vazio
      } else {
        setError('Falha ao iniciar o chat.');
      }
    })
    .catch((error) => {
      console.error("Erro ao iniciar chat:", error);
      setError('Erro ao iniciar o chat.');
    });
  };

  if (!isChatOpen) {
    return null;
  }

  return (
    <div className="chatContainer">
      <div className="header-chat">
        <h3>Conversas</h3>
        <button onClick={() => setIsChatOpen(false)} className="closeButton">X</button>
      </div>

      {chat ? (
        <>
          {/* Exibe as mensagens do chat */}
          <div className="messagesContainer">
            {messages.length > 0 ? (
              messages.map((message) => (
                <p key={message.id} className={message.is_employee ? "message employee" : "message client"}>
                  <strong>{message.is_employee ? 'Suporte' : 'Você'}:</strong> {message.content}
                </p>
              ))
            ) : (
              <p>Tem alguma dúvida? Envie uma mensagem para um funcionário.</p>
            )}
          </div>

          {/* Componente para envio de novas mensagens */}
          <MessageInput 
            chatId={chat.id} 
            isEmployee={false} 
            onMessageSent={() => loadMessages(chat.id)} 
          />
        </>
      ) : (
        // Exibe apenas o botão para iniciar o chat se o chat não existir
        <div className="iniciarChatContainer">
          <p>Você não tem um chat ativo.</p>
          <button onClick={iniciarChat} className="ChatButton">Iniciar Chat</button>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
}

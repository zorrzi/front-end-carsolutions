// components/chat/EmployeeChat/index.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageInput from "../MessageInput/MessageInput";

const token = localStorage.getItem('token');

export default function ChatFuncionario() {
  const [chats, setChats] = useState([]);         // Lista de chats
  const [selectedChat, setSelectedChat] = useState(null); // Chat selecionado
  const [messages, setMessages] = useState([]);    // Mensagens do chat selecionado

  // Carrega todos os chats ao montar o componente
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/chat/funcionario/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then((response) => {
      // Verifique se a resposta contém os chats antes de definir o estado
      if (response.data && response.data.chats) {
        setChats(response.data.chats);
        console.log(response.data.chats);
      }
    })
    .catch((error) => console.error("Erro ao buscar chats:", error));
  }, []);

  // Carrega as mensagens do chat selecionado
  const loadMessages = (chatId) => {
    axios.get(`http://127.0.0.1:8000/chat/cliente/${chatId}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then((response) => {
        console.log(response.data);
      // Verifica se response.data.chat e response.data.chat.messages estão definidos
      if (response.data && response.data.chat && response.data.chat.messages) {
        setMessages(response.data.chat.messages);
      } else {
        console.error("Estrutura de dados inesperada:", response.data);
        setMessages([]); // Define como vazio caso não tenha mensagens
      }
    })
    .catch((error) => console.error("Erro ao carregar mensagens:", error));
  };

  return (
    <div>
      <h2>Todos os Chats de Clientes</h2>
      
      {/* Lista de chats */}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }}>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <button 
              key={chat.id} 
              onClick={() => {
                setSelectedChat(chat.id); 
                loadMessages(chat.id);
              }}
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: selectedChat === chat.id ? '#ddd' : '#f5f5f5'
              }}
            >
              Chat com {chat.cliente}
            </button>
          ))
        ) : (
          <p>Nenhum chat disponível.</p>
        )}
      </div>

      {/* Área de mensagens do chat selecionado */}
      {selectedChat && (
        <div style={{ marginTop: '20px' }}>
          <h3>Mensagens com {chats.find(chat => chat.id === selectedChat)?.cliente.username}</h3>
          
          {/* Exibe as mensagens do chat */}
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            {messages.length > 0 ? (
              messages.map((message) => (
                <p key={message.id}>
                  <strong>{message.is_employee ? 'Funcionário' : 'Cliente'}:</strong> {message.content}
                </p>
              ))
            ) : (
              <p>Sem mensagens ainda.</p>
            )}
          </div>

          {/* Componente para envio de novas mensagens */}
          <MessageInput chatId={selectedChat} isEmployee={true} onMessageSent={() => loadMessages(selectedChat)} />
        </div>
      )}
    </div>
  );
}

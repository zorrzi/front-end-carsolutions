// components/chat/EmployeeChat/ChatFuncionario.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageInput from "../MessageInput/MessageInput";
import './index.css';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; 


export default function ChatFuncionario() {
  const [chats, setChats] = useState([]); // Lista de todos os chats
  const [filteredChats, setFilteredChats] = useState([]); // Lista de chats filtrada pela pesquisa
  const [selectedChat, setSelectedChat] = useState(null); // Chat selecionado
  const [messages, setMessages] = useState([]); // Mensagens do chat selecionado
  const [searchTerm, setSearchTerm] = useState(''); // Termo de pesquisa

  // Carrega todos os chats ao montar o componente
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${apiBaseUrl}/chat/funcionario/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then((response) => {
      if (response.data && response.data.chats) {
        setChats(response.data.chats);
        setFilteredChats(response.data.chats); // Inicializa os chats filtrados com todos os chats
      }
    })
    .catch((error) => console.error("Erro ao buscar chats:", error));
  }, []);

  // Atualiza a lista de chats filtrada sempre que o termo de pesquisa muda
  useEffect(() => {
    const filtered = chats.filter(chat =>
      chat.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [searchTerm, chats]);

  // Carrega as mensagens do chat selecionado
  const loadMessages = (chatId) => {
    const token = localStorage.getItem('token');
    axios.get(`${apiBaseUrl}/chat/cliente/${chatId}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then((response) => {
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
    <div className="chatContainerFuncionario">
      <div className="header-chat">
        <h2>Conversas</h2>
      </div>

      {/* Barra de pesquisa e lista de chats só são exibidas se nenhum chat estiver selecionado */}
      {!selectedChat && (
        <>
          <div className="searchBar">
            <input 
              type="text"
              placeholder="Buscar usuário pelo nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="chatList">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => {
                    setSelectedChat(chat.id); 
                    loadMessages(chat.id);
                  }}
                  className={`chatItem ${selectedChat === chat.id ? 'active' : ''}`}
                >
                  <div className="userIcon">👤</div>
                  <div className="chatContent">
                    <h4>{chat.cliente}</h4>
                    <p>{chat.last_message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum chat encontrado.</p>
            )}
          </div>
        </>
      )}

      {/* Área de mensagens do chat selecionado */}
      {selectedChat && (
        <div>
          <div className="activeChatHeader">
            <button className="backButton" onClick={() => setSelectedChat(null)}>X</button>
            <h3>{chats.find(chat => chat.id === selectedChat)?.cliente}</h3>
          </div>
          
          <div className="messageContainer">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.is_employee ? 'employee' : 'client'}`}
                >
                  {message.content}
                </div>
              ))
            ) : (
              <p>Sem mensagens ainda.</p>
            )}
          </div>

          <div className="messageInputContainer">
            <MessageInput chatId={selectedChat} isEmployee={true} onMessageSent={() => loadMessages(selectedChat)} />
          </div>
        </div>
      )}
    </div>
  );
}

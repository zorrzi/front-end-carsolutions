import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';  // Importando o axios configurado
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function BotaoFavoritos() {
  const { id } = useParams();  // ID do carro
  const navigate = useNavigate();
  const [isFavorito, setIsFavorito] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar se o usuário está logado

  // Função para verificar se o usuário está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');  // Obtém o token do localStorage
    if (token) {
      setIsAuthenticated(true); // Usuário está autenticado
    }
  }, []);

  // Função para buscar o estado inicial do favorito (somente se o usuário estiver logado)
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');  // Obtém o token do localStorage

      const config = {
        headers: {
          Authorization: `Token ${token}`,  // Adiciona o token no cabeçalho
        },
      };

      axios.get(`${apiBaseUrl}/favoritar/${id}/status`, config)  // Endpoint que retorna o status do favorito
        .then(response => {
          setIsFavorito(response.data.isFavorito);  // Atualiza o estado com base na resposta do backend
        })
        .catch(error => {
          console.error("Erro ao verificar o status do favorito:", error);
        });
    }
  }, [id, isAuthenticated]);

  const toggleFavorito = () => {
    if (!isAuthenticated) {
      navigate('/loginCliente');  // Redireciona para o login se o usuário não estiver autenticado
      return;
    }

    const token = localStorage.getItem('token');  // Obtém o token do localStorage
    const config = {
      headers: {
        Authorization: `Token ${token}`,  // Adiciona o token no cabeçalho
      },
    };

    axios.post(`${apiBaseUrl}/favoritar/${id}/`, {}, config)  // Usar axios configurado com token
      .then(response => {
        setIsFavorito(!isFavorito);  // Inverte o estado do favorito
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("Erro ao adicionar/remover o carro dos favoritos:", error);
      });
  };

  return (
    <div>
      <button className='botao-favoritos' onClick={toggleFavorito}>
        <span className="texto-favoritos">
          {isFavorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </span>
        <img className='icone-favoritos' src={isFavorito ? '/favorito-cheio.png' : '/favorito.png'} alt='Favorito' />
      </button>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';  // Importando o axios configurado
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

export default function BotaoFavoritos() {
  const { id } = useParams();  // ID do carro
  const navigate = useNavigate();
  const [isFavorito, setIsFavorito] = useState(false);

  // Função para buscar o estado inicial do favorito ao carregar a página
  useEffect(() => {
    axios.get(`http://localhost:8000/favoritar/${id}/status`)  // Endpoint que retorna o status do favorito
      .then(response => {
        setIsFavorito(response.data.isFavorito);  // Atualiza o estado com base na resposta do backend
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          // Redireciona para a página de login se o usuário não estiver autenticado
          navigate('/loginCliente');
        } else {
          console.error("Erro ao verificar o status do favorito:", error);
        }
      });
  }, [id, navigate]);

  const toggleFavorito = () => {
    // Usar axios configurado com CSRF e sessão
    axios.post(`http://localhost:8000/favoritar/${id}/`, {})
      .then(response => {
        setIsFavorito(!isFavorito);  // Inverte o estado do favorito
        console.log(response.data.message);
      })
      .catch(error => {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          // Redireciona para a página de login se o usuário não estiver autenticado
          navigate('/loginCliente');
        } else {
          console.error("Erro ao adicionar/remover o carro dos favoritos:", error);
        }
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

import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';  // Usando o axios configurado
import { useNavigate } from 'react-router-dom';
import CarroCliente from '../CarroCliente';  // Componente que exibe o card do carro
import './index.css';  // Estilos
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CatalogoCarrosFavoritos() {
  const [favoriteCars, setFavoriteCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Função para buscar os carros favoritos do cliente
    const fetchFavoriteCars = async () => {
      const token = localStorage.getItem('token');  // Obtém o token do localStorage
      if (!token) {
        navigate('/loginCliente');  // Redireciona para a página de login se não houver token
        return;
      }

      try {
        // Envia o token no cabeçalho da requisição
        const config = {
          headers: {
            Authorization: `Token ${token}`,  // Envia o token no cabeçalho
          },
        };

        const response = await axios.get(`${apiBaseUrl}/favoritos/`, config);  // Faz a requisição para obter os favoritos
        setFavoriteCars(response.data);  // Define os carros favoritados no estado
      } catch (error) {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          // Redireciona para a página de login se o usuário não estiver autenticado
          navigate('/loginCliente');
        } else {
          console.error('Erro ao buscar os carros favoritos:', error);
        }
      }
    };

    // Verifica se o usuário está autenticado antes de buscar os favoritos
    const isUserAuthenticated = localStorage.getItem('token');
    if (isUserAuthenticated) {
      fetchFavoriteCars();
    } else {
      navigate('/loginCliente');  // Redireciona para a página de login se não estiver autenticado
    }
  }, [navigate]);

  return (
    <div className="catalogo-carros">
      {favoriteCars.length === 0 ? (
        <p className='nenhum-fav'>Nenhum carro favoritado disponível</p>  // Exibe uma mensagem se não houver carros favoritados
      ) : (
        favoriteCars.map((car) => (
          <CarroCliente className="card-carro" key={car.id} car={car} />  // Renderiza um Card para cada carro favoritado
        ))
      )}
    </div>
  );
}

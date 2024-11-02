// CatalogoFeedbacks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackFuncionario from '../FeedbackFuncionario';
import './index.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CatalogoFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [ordenacao, setOrdenacao] = useState('mais_recentes'); // Padrão de ordenação

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${apiBaseUrl}/agendamentos/feedbacks/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        setFeedbacks(response.data);
        console.log('Feedbacks:', response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os feedbacks:', error);
      });
  }, []);

  // Função para aplicar a ordenação
  const ordenarFeedbacks = () => {
    switch (ordenacao) {
      case 'maior_nota':
        return [...feedbacks].sort((a, b) => b.nota - a.nota);
      case 'menor_nota':
        return [...feedbacks].sort((a, b) => a.nota - b.nota);
      case 'mais_antigas':
        return feedbacks;
      case 'mais_recentes':
        return [...feedbacks].reverse();
      default:
        return feedbacks;
    }
  };

  return (
    <div className="catalogo-feedbacks">
      <h2 className='titulo-feedbacks-catalogo'>Feedbacks</h2>
      <div className="ordenacao-container">
        <label>Ordenar por:</label>
        <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
          <option value="maior_nota">Maior para menor nota</option>
          <option value="menor_nota">Menor para maior nota</option>
          <option value="mais_recentes">Mais recentes</option>
          <option value="mais_antigas">Mais antigas</option>
        </select>
      </div>

      <div className="feedbacks-lista">
        {ordenarFeedbacks().map((feedback) => (
          <FeedbackFuncionario key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
}

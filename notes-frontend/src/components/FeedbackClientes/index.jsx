// CatalogoFeedbacks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackFuncionario from '../FeedbackFuncionario';
import './index.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CatalogoFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${apiBaseUrl}/agendamentos/feedbacks/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        // Filtra os feedbacks com nota 5 e limita a 3 feedbacks
        const topFeedbacks = response.data.filter(feedback => feedback.nota === 5).slice(0, 5);
        setFeedbacks(topFeedbacks);
        console.log('Feedbacks com nota 5:', topFeedbacks);

        // Exibe cada card gradualmente com um intervalo para animação sequencial
        const interval = setInterval(() => {
          setVisibleCards((prevCards) => {
            const nextIndex = prevCards.length;
            if (nextIndex < topFeedbacks.length) {
              return [...prevCards, nextIndex];
            }
            clearInterval(interval);
            return prevCards;
          });
        }, 500);

        return () => clearInterval(interval);
      })
      .catch(error => {
        console.error('Erro ao buscar os feedbacks:', error);
      });
  }, []);

  return (
    <div className="feedback-clientes-container">
      <h2 className="titulo-animado-feed">O que nossos clientes dizem</h2>
      <div className="feedback-cards">
        {feedbacks.map((feedback, index) => (
          <div
            key={feedback.id}
            className={`feedback-card ${visibleCards.includes(index) ? 'card-visible' : ''}`}
          >
            <FeedbackFuncionario feedback={feedback} />
          </div>
        ))}
      </div>
    </div>
  );
}

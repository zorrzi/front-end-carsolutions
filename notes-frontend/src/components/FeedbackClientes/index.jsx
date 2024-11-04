// CatalogoFeedbacks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CatalogoFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/agendamentos/feedbacks/`, {
      })
      .then((response) => {
        // Filtra os feedbacks com nota 5 e limita a 5 feedbacks
        const topFeedbacks = response.data.filter((feedback) => feedback.nota === 5).slice(0, 5);
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
      .catch((error) => {
        console.error('Erro ao buscar os feedbacks:', error);
      });
  }, []);

  const renderStars = (nota) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`cliente-rating ${i <= nota ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="feedback-clientes-container">
      <h2 className="titulo-animado-feed">O que nossos clientes dizem</h2>
      <div className="feedback-cards">
        {feedbacks.map((feedback, index) => (
          <div
            key={feedback.id}
            className={`feedback-card ${visibleCards.includes(index) ? 'card-visible' : ''}`}
          >
            <p className="cliente-nome">{feedback.usuario}</p>
            <p className="cliente-feedback">{feedback.comentario}</p>
            <div className="cliente-rating">{renderStars(feedback.nota)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import './index.css';

export default function FeedbackClientes() {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    // Exibir cada card com um intervalo para animação sequencial
    const interval = setInterval(() => {
      setVisibleCards((prevCards) => {
        const nextIndex = prevCards.length;
        if (nextIndex < feedbacks.length) {
          return [...prevCards, nextIndex];
        }
        clearInterval(interval);
        return prevCards;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const feedbacks = [
    {
      id: 1,
      name: 'João Silva',
      feedback: 'Excelente serviço! O carro estava em perfeitas condições e o atendimento foi impecável. Recomendo a Car Solutions a todos!',
      rating: 5
    },
    {
      id: 2,
      name: 'Maria Fernandes',
      feedback: 'Amei a experiência! Aluguei um carro para minha viagem de férias e tudo foi super prático e rápido.',
      rating: 4
    },
    {
      id: 3,
      name: 'Carlos Almeida',
      feedback: 'Muito satisfeito! O processo de compra foi claro e transparente. Voltarei a fazer negócios com eles.',
      rating: 5
    }
  ];

  return (
    <div className="feedback-clientes-container">
      <h2 className="titulo-animado-feed">O que nossos clientes dizem</h2>
      <div className="feedback-cards">
        {feedbacks.map((feedback, index) => (
          <div
            key={feedback.id}
            className={`feedback-card ${visibleCards.includes(index) ? 'card-visible' : ''}`}
          >
            <h3 className="cliente-nome">{feedback.name}</h3>
            <p className="cliente-feedback">{feedback.feedback}</p>
            <p className="cliente-rating">{'⭐'.repeat(feedback.rating)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

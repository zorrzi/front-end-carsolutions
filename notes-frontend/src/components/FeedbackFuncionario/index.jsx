// FeedbackFuncionario.js
import React from 'react';
import './index.css';

export default function FeedbackFuncionario({ feedback }) {
  return (
    <div className="card feedback-card-feedback">
      <div className="nome-feedback">
        <p className="card-title-feedback">{feedback.usuario}</p>
        <p className="feedback-comment">{feedback.comentario}</p>
        
      </div>
      <p className="card-subtitle-feedback">Nota: {renderStars(feedback.nota)}</p>
      
    </div>
  );
}

function renderStars(nota) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`star-feedback ${i <= nota ? 'filled' : ''}`}>
        ★
      </span>
    );
  }
  return stars;
}

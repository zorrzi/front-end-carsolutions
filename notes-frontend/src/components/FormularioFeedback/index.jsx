// FormularioFeedback.js
import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function FormularioFeedback({ agendamentoId, onFeedbackSubmit }) {
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState(0);

  const handleStarClick = (rating) => {
    setNota(rating); // Define a nota com a quantidade de estrelas clicadas
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `${apiBaseUrl}/agendamentos/agendamento/${agendamentoId}/feedback/`,
        { comentario, nota },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      onFeedbackSubmit();
    } catch (error) {
      console.error('Erro ao registrar feedback:', error);
    }
  };

  return (
    <div className="feedback-form-container">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Comentário:
          <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} />
        </label>
        <label>
          Nota:
          <div className="star-rating">
            {[5, 4, 3, 2, 1].map((star) => (
              <span
                key={star}
                className={star <= nota ? 'star filled' : 'star'}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
        </label>
        <button type="submit">Enviar Feedback</button>
      </form>
    </div>
  );
}

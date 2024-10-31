import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackFuncionario from '../FeedbackFuncionario';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CatalogoFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

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

  return (
    <div className="catalogo-feedbacks">
      {feedbacks.length === 0 ? (
        <p>Nenhum feedback disponível</p>
      ) : (
        feedbacks.map((feedback) => (
          <FeedbackFuncionario key={feedback.id} feedback={feedback} />
        ))
      )}
    </div>
  );
}

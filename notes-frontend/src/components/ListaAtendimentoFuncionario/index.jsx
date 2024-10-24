import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export default function ListaAtendimentoFuncionario() {
  const [meusAtendimentos, setMeusAtendimentos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8000/agendamentos/meus/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      setMeusAtendimentos(response.data);
    })
    .catch(error => {
      console.error('Erro ao carregar os atendimentos do funcionário:', error);
    });
  }, []);

  return (
    <div>
      <h1>Meus Atendimentos</h1>
      {meusAtendimentos.length === 0 ? (
        <p>Você não tem agendamentos assumidos no momento.</p>
      ) : (
        <ul>
          {meusAtendimentos.map((atendimento, index) => (
            <li key={index}>
              <p>Carro: {atendimento.carro}</p>
              <p>Data: {atendimento.data || atendimento.data_retirada}</p>
              <p>Horário: {atendimento.horario || atendimento.horario_retirada}</p>
              <p>Tipo: {atendimento.tipo}</p>
              <p>Status: {atendimento.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

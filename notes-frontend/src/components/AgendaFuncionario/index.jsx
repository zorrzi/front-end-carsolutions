import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export default function AgendaFuncionario() {
  const [agendamentosPendentes, setAgendamentosPendentes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8000/agendamentos/pendentes/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      setAgendamentosPendentes(response.data);
    })
    .catch(error => {
      console.error('Erro ao carregar os agendamentos pendentes:', error);
    });
  }, []);

  const handleAtenderAgendamento = (agendamentoId) => {
    const token = localStorage.getItem('token');
    
    axios.post(`http://localhost:8000/agendamentos/assumir/${agendamentoId}/`, {}, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      alert('Agendamento assumido com sucesso!');
      // Remove o agendamento assumido da lista de pendentes
      setAgendamentosPendentes(agendamentosPendentes.filter(agendamento => agendamento.id !== agendamentoId));
    })
    .catch(error => {
      console.error('Erro ao assumir o agendamento:', error);
    });
  };

  return (
    <div>
      <h1>Agendamentos Pendentes</h1>
      {agendamentosPendentes.length === 0 ? (
        <p>Não há agendamentos pendentes.</p>
      ) : (
        <ul>
          {agendamentosPendentes.map((agendamento, index) => (
            <li key={index}>
              <p>Carro: {agendamento.carro}</p>
              <p>Data: {agendamento.data || agendamento.data_retirada}</p>
              <p>Horário: {agendamento.horario || agendamento.horario_retirada}</p>
              <p>Tipo: {agendamento.tipo}</p>
              <button onClick={() => handleAtenderAgendamento(agendamento.id)}>Atender</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

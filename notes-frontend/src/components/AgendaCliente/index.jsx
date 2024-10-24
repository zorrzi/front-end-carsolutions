import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export default function AgendamentoCliente() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get('http://localhost:8000/agendamentos/agendamento/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(response => {
      setAgendamentos(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar agendamentos:', error);
    });
  }, []);

  return (
    <div>
      <h1>Meus Agendamentos</h1>
      {agendamentos.length === 0 ? (
        <p>Você não tem agendamentos.</p>
      ) : (
        <ul>
          {agendamentos.map((agendamento, index) => (
            <li key={index}>
              <p>Carro: {agendamento.carro}</p>
              <p>Tipo: {agendamento.tipo}</p>
              
              {/* Exibe informações de acordo com o tipo de agendamento */}
              {agendamento.tipo === 'venda' ? (
                <>
                  <p>Data: {agendamento.data}</p>
                  <p>Horário: {agendamento.horario}</p>
                </>
              ) : (
                <>
                  <p>Data de Retirada: {agendamento.data_retirada}</p>
                  <p>Horário de Retirada: {agendamento.horario_retirada}</p>
                  <p>Data de Devolução: {agendamento.data_devolucao}</p>
                  <p>Horário de Devolução: {agendamento.horario_devolucao}</p>
                </>
              )}

              <p>Status: {agendamento.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

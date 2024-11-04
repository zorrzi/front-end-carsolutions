import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function AgendaFuncionario() {
  const [agendamentosPendentes, setAgendamentosPendentes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${apiBaseUrl}/agendamentos/agendamento/pendentes/`, {
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
    
    axios.post(`${apiBaseUrl}/agendamentos/agendamento/assumir/${agendamentoId}/`, {}, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      setAgendamentosPendentes(agendamentosPendentes.filter(agendamento => agendamento.id !== agendamentoId));
    })
    .catch(error => {
      console.error('Erro ao assumir o agendamento:', error);
    });
  };

  const formatarData = (data) => {
    if (!data) return '';
    return data.split('-').reverse().join('/');
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="agenda-funcionario-container">
      <h2 className="titulo-agenda-funcionario">Atendimento ao cliente</h2>
      {agendamentosPendentes.length === 0 ? (
        <p>Não há agendamentos pendentes.</p>
      ) : (
        <table className="tabela-agendamentos">
          <tbody>
            {agendamentosPendentes.map((agendamento, index) => (
              agendamento.tipo === 'visita' ? (
                <tr key={index}>
                  <td>
                    {agendamento.nome_cliente} - {capitalizeFirstLetter(agendamento.tipo)} - 
                    {formatarData(agendamento.data)} - {agendamento.horario}
                  </td>
                  <td>
                    <button className="btn-atender" onClick={() => handleAtenderAgendamento(agendamento.id)}>
                      Atender
                    </button>
                  </td>
                </tr>
              ) : agendamento.tipo === 'reserva' ? (
                <tr key={index}>
                  <td>
                    {agendamento.nome_cliente} - {capitalizeFirstLetter(agendamento.tipo)} - 
                    {formatarData(agendamento.data)}
                  </td>
                  <td>
                    <button className="btn-atender" onClick={() => handleAtenderAgendamento(agendamento.id)}>
                      Atender
                    </button>
                  </td>
                </tr>
              ) : agendamento.tipo === 'aluguel' ? (
                <tr key={index}>
                  <td>
                    {agendamento.nome_cliente} - {capitalizeFirstLetter(agendamento.tipo)} - 
                    {formatarData(agendamento.data_retirada)} - {agendamento.horario_retirada}
                  </td>
                  <td>
                    <button className="btn-atender" onClick={() => handleAtenderAgendamento(agendamento.id)}>
                      Atender
                    </button>
                  </td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

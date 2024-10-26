import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export default function AgendaFuncionario() {
  const [agendamentosPendentes, setAgendamentosPendentes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8000/agendamentos/agendamento/pendentes/', {
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
    
    axios.post(`http://localhost:8000/agendamentos/agendamento/assumir/${agendamentoId}/`, {}, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      alert('Agendamento assumido com sucesso!');
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
              <tr key={index}>
                <td>
                  {agendamento.nome_cliente} - {capitalizeFirstLetter(agendamento.tipo)} - 
                  {formatarData(agendamento.data)} - {agendamento.horario}
                </td>
                <td>
                  <button className="btn-atender" onClick={() => handleAtenderAgendamento(agendamento.id)}>Atender</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

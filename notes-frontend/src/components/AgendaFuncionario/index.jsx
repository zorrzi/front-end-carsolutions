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

  // Função que transforma a data no formato yyyy-mm-dd para dd/mm/yyyy
  const formatarData = (data) => {
    if (!data) return '';
    else
      return data.split('-').reverse().join('/');

  };

  // Função que deixa a primeira letra da string em maiúscula
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
                  Usuário{index + 1} - {capitalizeFirstLetter(agendamento.tipo)} - {formatarData(agendamento.data) || formatarData(agendamento.data_retirada)} - {agendamento.horario || agendamento.horario_retirada}
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

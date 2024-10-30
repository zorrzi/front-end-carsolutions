import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ListaAtendimentoFuncionario() {
  const [meusAtendimentos, setMeusAtendimentos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${apiBaseUrl}/agendamentos/agendamento/meus/`, {
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

  const formatarData = (data) => {
    if (!data) return '';
    return data.split('-').reverse().join('/');
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="atendimentos-container">
      <h1 className="titulo">Lista de atendimento</h1>
      {meusAtendimentos.length === 0 ? (
        <p>Você não tem agendamentos assumidos no momento.</p>
      ) : (
        <table className="atendimentos-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Operação</th>
              <th>Data</th>
              <th>Horário</th>
            </tr>
          </thead>
          <tbody>
            {meusAtendimentos.map((atendimento, index) => (
              <tr key={index}>
                <td>{atendimento.nome}</td>
                <td>{capitalizeFirstLetter(atendimento.tipo)}</td>
                <td>{formatarData(atendimento.data) || formatarData(atendimento.data_retirada)}</td>
                <td>{atendimento.horario || atendimento.horario_retirada}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

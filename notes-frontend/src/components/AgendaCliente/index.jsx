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

  // Função para retornar a classe CSS com base no status do agendamento
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'cancelado':
        return 'status-cancelado';
      case 'pendente':
        return 'status-pendente';
      case 'em atendimento':
        return 'status-atendimento';
      case 'concluido':
        return 'status-concluido';
      default:
        return '';
    }
  };

  // Função para transformar a data no formato dd/mm/aaaa
  const formatarData = (data) => {
    const dataSplit = data.split('-');
    return `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`;
  };

  // Trocar a primeira letra para maiúscula
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="lista-agendamentos-container">
        <h2 className="titulo-agendamentos">Lista de Agendamentos</h2>
        <table className="tabela-agendamentos">
            <thead>
                <tr>
                    <th>Carro</th>
                    <th>Operação</th>
                    <th>Data da Retirada</th>
                    <th>Horário da Retirada</th>
                    <th>Data da Devolução</th>
                    <th>Horário da Devolução</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {agendamentos.length > 0 ? (
                    agendamentos.map((agendamento, index) => (
                        <tr key={index}>
                            <td>{agendamento.carro}</td>
                            <td>{capitalizeFirstLetter(agendamento.tipo)}</td>
                            <td>{agendamento.tipo === 'venda' ? formatarData(agendamento.data) : formatarData(agendamento.data_retirada)}</td>
                            <td>{agendamento.tipo === 'venda' ? agendamento.horario : agendamento.horario_retirada}</td>
                            <td>{agendamento.tipo === 'venda' ? '' : formatarData(agendamento.data_devolucao)}</td>
                            <td>{agendamento.tipo === 'venda' ? '' : agendamento.horario_devolucao}</td>
                            {/* Aplicando a classe condicionalmente com base no status */}
                            <td className={getStatusClass(agendamento.status)}>{capitalizeFirstLetter(agendamento.status)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">Nenhum agendamento encontrado</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  );
}

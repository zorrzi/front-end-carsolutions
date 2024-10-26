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
      // Ordena os agendamentos: visitas, depois alugueis, depois reservas
      const sortedAgendamentos = response.data.sort((a, b) => {
        const order = ['visita', 'aluguel', 'reserva'];
        return order.indexOf(a.tipo) - order.indexOf(b.tipo);
      });
      setAgendamentos(sortedAgendamentos);
    })
    .catch(error => {
      console.error('Erro ao buscar agendamentos:', error);
    });
  }, []);

  const getStatusClass = (status) => {
    if (!status) return '';
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

  const formatarData = (data) => {
    if (!data) return '';
    const dataSplit = data.split('-');
    return `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`;
  };

  const formatarHorario = (horario) => {
    if (!horario) return '';
    const [hours, minutes] = horario.split(':');
    return `${hours}:${minutes}`;
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
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
                    <th>Data da Visita</th>
                    <th>Horário da Visita</th>
                    <th>Data Expiração (Reserva)</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {agendamentos.length > 0 ? (
                    agendamentos.map((agendamento, index) => (
                        <tr key={index}>
                            <td>{agendamento.carro}</td>
                            <td>{capitalizeFirstLetter(agendamento.tipo)}</td>
                            <td>
                              {agendamento.tipo === 'reserva' 
                                ? formatarData(agendamento.data) 
                                : formatarData(agendamento.data_retirada)}
                            </td>
                            <td>
                              {agendamento.tipo === 'reserva' 
                                ? formatarHorario(agendamento.horario) 
                                : formatarHorario(agendamento.horario_retirada)}
                            </td>
                            <td>
                              {agendamento.tipo === 'aluguel' 
                                ? formatarData(agendamento.data_devolucao) 
                                : ''}
                            </td>
                            <td>
                              {agendamento.tipo === 'aluguel' 
                                ? formatarHorario(agendamento.horario_devolucao) 
                                : ''}
                            </td>
                            <td>
                              {agendamento.tipo === 'visita' 
                                ? formatarData(agendamento.data) 
                                : ''}
                            </td>
                            <td>
                              {agendamento.tipo === 'visita' 
                                ? formatarHorario(agendamento.horario) 
                                : ''}
                            </td>
                            <td>
                              {agendamento.tipo === 'reserva' 
                                ? formatarData(agendamento.data_expiracao) 
                                : ''}
                            </td>
                            <td className={getStatusClass(agendamento.status)}>
                              {capitalizeFirstLetter(agendamento.status)}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="10">Nenhum agendamento encontrado</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  );
}

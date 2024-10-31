import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function AgendamentoCliente() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [tabelaAtiva, setTabelaAtiva] = useState('visita'); // Estado para controlar a tabela ativa

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get(`${apiBaseUrl}/agendamentos/agendamento/`, {
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

  const getStatusClass = (status) => {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'cancelado':
        return 'status-cancelado';
      case 'pendente':
        return 'status-pendente';
      case 'confirmado':
        return 'status-confirmado';
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

  const visitas = agendamentos.filter(agendamento => agendamento.tipo === 'visita');
  const reservas = agendamentos.filter(agendamento => agendamento.tipo === 'reserva');
  const alugueis = agendamentos.filter(agendamento => agendamento.tipo === 'aluguel');

  return (
    <div className="lista-agendamentos-container">

      {/* Botões para alternar entre tabelas */}
      <div className="botoes-tabelas">
        <button
          className={`botao-tabela ${tabelaAtiva === 'visita' ? 'selecionado' : ''}`}
          onClick={() => setTabelaAtiva('visita')}
        >
          Visitas
        </button>
        <button
          className={`botao-tabela ${tabelaAtiva === 'reserva' ? 'selecionado' : ''}`}
          onClick={() => setTabelaAtiva('reserva')}
        >
          Compras
        </button>
        <button
          className={`botao-tabela ${tabelaAtiva === 'aluguel' ? 'selecionado' : ''}`}
          onClick={() => setTabelaAtiva('aluguel')}
        >
          Aluguéis
        </button>
      </div>

      {/* Tabela de Visitas */}
      {tabelaAtiva === 'visita' && (
        <div>
          <h3 className='titulo-lista1'>Lista de Visitas</h3>
          <table className="tabela-agendamentos">
            <thead>
              <tr>
                <th>Carro</th>
                <th>Operação</th>
                <th>Data da Visita</th>
                <th>Horário da Visita</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visitas.length > 0 ? (
                visitas.map((agendamento, index) => (
                  <tr key={index}>
                    <td>{agendamento.carro}</td>
                    <td>{capitalizeFirstLetter(agendamento.tipo)}</td>
                    <td>{formatarData(agendamento.data)}</td>
                    <td>{formatarHorario(agendamento.horario)}</td>
                    <td className={getStatusClass(agendamento.status)}>
                      {capitalizeFirstLetter(agendamento.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Nenhuma visita encontrada</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabela de Compras/Reservas */}
      {tabelaAtiva === 'reserva' && (
        <div>
          <h3 className='titulo-lista'>Lista de Compras</h3>
          <table className="tabela-agendamentos">
            <thead>
              <tr>
                <th>Carro</th>
                <th>Operação</th>
                <th>Data</th>
                <th>Data Limite</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length > 0 ? (
                reservas.map((agendamento, index) => (
                  <tr key={index}>
                    <td>{agendamento.carro}</td>
                    <td>{capitalizeFirstLetter(agendamento.tipo)}</td>
                    <td>{formatarData(agendamento.data)}</td>
                    <td>{formatarHorario(agendamento.data_expiracao)}</td>
                    <td className={getStatusClass(agendamento.status)}>
                      {capitalizeFirstLetter(agendamento.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Nenhuma compra/reserva encontrada</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabela de Aluguéis */}
      {tabelaAtiva === 'aluguel' && (
        <div>
          <h3 className='titulo-lista'>Lista de Aluguéis</h3>
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
              {alugueis.length > 0 ? (
                alugueis.map((agendamento, index) => (
                  <tr key={index}>
                    <td>{agendamento.carro}</td>
                    <td>{capitalizeFirstLetter(agendamento.tipo)}</td>
                    <td>{formatarData(agendamento.data_retirada)}</td>
                    <td>{formatarHorario(agendamento.horario_retirada)}</td>
                    <td>{formatarData(agendamento.data_devolucao)}</td>
                    <td>{formatarHorario(agendamento.horario_devolucao)}</td>
                    <td className={getStatusClass(agendamento.status)}>
                      {capitalizeFirstLetter(agendamento.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Nenhum aluguel encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

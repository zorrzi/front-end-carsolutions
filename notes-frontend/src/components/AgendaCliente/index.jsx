// AgendamentoCliente.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormularioFeedback from '../FormularioFeedback';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function AgendamentoCliente() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [tabelaAtiva, setTabelaAtiva] = useState('visita');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedAgendamentoId, setSelectedAgendamentoId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${apiBaseUrl}/agendamentos/agendamento/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setAgendamentos(response.data))
      .catch((error) => console.error('Erro ao buscar agendamentos:', error));
  }, []);

  const handleAvaliarClick = (agendamentoId) => {
    // Alterna o formulário de feedback para o agendamento clicado
    if (showFeedbackForm && selectedAgendamentoId === agendamentoId) {
      setShowFeedbackForm(false); // Fecha o formulário se já estiver aberto para o mesmo agendamento
      setSelectedAgendamentoId(null);
    } else {
      setSelectedAgendamentoId(agendamentoId);
      setShowFeedbackForm(true); // Abre o formulário para o novo agendamento
    }
  };

  const handleFeedbackSubmit = () => {
    setAgendamentos(
      agendamentos.map((agendamento) =>
        agendamento.id === selectedAgendamentoId
          ? { ...agendamento, feedbackEnviado: true }
          : agendamento
      )
    );
    setShowFeedbackForm(false);
    setSelectedAgendamentoId(null);
  };

  useEffect(() => {
    // Fecha o formulário de feedback ao mudar de tabela
    if (showFeedbackForm) {
      setShowFeedbackForm(false);
      setSelectedAgendamentoId(null);
    }
  }, [tabelaAtiva]);

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

  const visitas = agendamentos.filter((agendamento) => agendamento.tipo === 'visita');
  const reservas = agendamentos.filter((agendamento) => agendamento.tipo === 'reserva');
  const alugueis = agendamentos.filter((agendamento) => agendamento.tipo === 'aluguel');

  return (
    <div className="lista-agendamentos-container">
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
          <h3 className="titulo-lista1">Lista de Visitas</h3>
          <table className="tabela-agendamentos">
            <thead>
              <tr>
                <th>Carro</th>
                <th>Operação</th>
                <th>Data da Visita</th>
                <th>Horário da Visita</th>
                <th>Status</th>
                <th>Avaliação</th>
              </tr>
            </thead>
            <tbody>
              {visitas.length > 0 ? (
                visitas.map((agendamento) => (
                  <tr key={agendamento.id}>
                    <td>{agendamento.carro_marca} {agendamento.carro_modelo}</td>
                    <td>{capitalizeFirstLetter(agendamento.tipo)}</td>
                    <td>{formatarData(agendamento.data)}</td>
                    <td>{formatarHorario(agendamento.horario)}</td>
                    <td className={getStatusClass(agendamento.status)}>
                      {capitalizeFirstLetter(agendamento.status)}
                    </td>
                    <td>
                      {agendamento.status === 'concluido' && !agendamento.feedbackEnviado ? (
                        <button className='botao-avaliar' onClick={() => handleAvaliarClick(agendamento.id)}>
                          <p className='texto-avaliar'>Avaliar</p>
                        </button>
                      ) : (
                        <span>{agendamento.feedbackEnviado ? 'Avaliado' : 'Não Disponível'}</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Nenhuma visita encontrada</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabela de Compras/Reservas */}
      {tabelaAtiva === 'reserva' && (
        <div>
          <h3 className="titulo-lista">Lista de Reservas</h3>
          <table className="tabela-agendamentos">
            <thead>
              <tr>
                <th>Carro</th>
                <th>Operação</th>
                <th>Data</th>
                <th>Data Limite</th>
                <th>Status</th>
                <th>Avaliação</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length > 0 ? (
                reservas.map((agendamento) => (
                  <tr key={agendamento.id}>
                    <td>{agendamento.carro_marca} {agendamento.carro_modelo}</td>
                    <td>{capitalizeFirstLetter(agendamento.tipo)}</td>
                    <td>{formatarData(agendamento.data)}</td>
                    <td>{formatarData(agendamento.data_expiracao)}</td>
                    <td className={getStatusClass(agendamento.status)}>
                      {capitalizeFirstLetter(agendamento.status)}
                    </td>
                    <td>
                      {agendamento.status === 'concluido' && !agendamento.feedbackEnviado ? (
                        <button onClick={() => handleAvaliarClick(agendamento.id)}>
                          Avaliar
                        </button>
                      ) : (
                        <span>{agendamento.feedbackEnviado ? 'Avaliado' : 'Não Disponível'}</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Nenhuma compra/reserva encontrada</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabela de Aluguéis */}
      {tabelaAtiva === 'aluguel' && (
        <div>
          <h3 className="titulo-lista">Lista de Aluguéis</h3>
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
                <th>Avaliação</th>
              </tr>
            </thead>
            <tbody>
              {alugueis.length > 0 ? (
                alugueis.map((agendamento) => (
                  <tr key={agendamento.id}>
                    <td>{agendamento.carro_marca} {agendamento.carro_modelo}</td>
                    <td>{capitalizeFirstLetter(agendamento.tipo)}</td>
                    <td>{formatarData(agendamento.data_retirada)}</td>
                    <td>{formatarHorario(agendamento.horario_retirada)}</td>
                    <td>{formatarData(agendamento.data_devolucao)}</td>
                    <td>{formatarHorario(agendamento.horario_devolucao)}</td>
                    <td className={getStatusClass(agendamento.status)}>
                      {capitalizeFirstLetter(agendamento.status)}
                    </td>
                    <td>
                      {agendamento.status === 'concluido' && !agendamento.feedbackEnviado ? (
                        <button onClick={() => handleAvaliarClick(agendamento.id)}>
                          Avaliar
                        </button>
                      ) : (
                        <span>{agendamento.feedbackEnviado ? 'Avaliado' : 'Não Disponível'}</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Nenhum aluguel encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {showFeedbackForm && (
        <FormularioFeedback
          className="formulario-feedback"
          agendamentoId={selectedAgendamentoId}
          onFeedbackSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}

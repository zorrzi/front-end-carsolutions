// components/InformacoesCarro.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import BotaoFavoritos from '../BotaoFavoritos';
import BotaoVoltar from '../BotaoVoltar/';
import Carrossel from '../Carrossel';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function InformacoesCarro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [activeForm, setActiveForm] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [creditCard, setCreditCard] = useState({
    numero_cartao: '',
    nome_titular: '',
    data_validade: '',
    codigo_seguranca: '',
    salvar_para_futuro: false,
    nome_cartao: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/cars/${id}/`)
      .then(response => setCar(response.data))
      .catch(error => console.error('Erro ao buscar o carro:', error));

    const fetchCreditCards = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${apiBaseUrl}/cartaodecredito/listar/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setCreditCards(response.data);
      }
    };
    fetchCreditCards();
  }, [id]);

  const handleAuthentication = (action) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/loginCliente');
    } else {
      setActiveForm(action);
    }
  };

  const handleSuccess = () => {
    setShowPopup(true);
    setActiveForm('');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/');
  };

  const handleScheduleVisit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${apiBaseUrl}/agendamentos/agendar/visita/`, {
        carro_id: car.id,
        data: date,
        horario: time,
      }, {
        headers: { Authorization: `Token ${token}` }
      });
      handleSuccess();
    } catch (error) {
      setErrorMessage('Erro ao agendar visita: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleReserveVehicle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = selectedCard
      ? { carro_id: car.id, cartao_id: selectedCard }
      : { carro_id: car.id, novo_cartao: creditCard };

    try {
      await axios.post(`${apiBaseUrl}/agendamentos/reservar/veiculo/`, data, {
        headers: { Authorization: `Token ${token}` }
      });

      await axios.post(`${apiBaseUrl}/cars/reserve/${car.id}/`, { is_reserved: true }, {
        headers: { Authorization: `Token ${token}` }
      });

      handleSuccess();
    } catch (error) {
      setErrorMessage('Erro ao reservar veículo: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleRentCar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = selectedCard
      ? {
          carro_id: car.id,
          cartao_id: selectedCard,
          data_retirada: pickupDate,
          horario_retirada: pickupTime,
          data_devolucao: returnDate,
          horario_devolucao: returnTime,
        }
      : {
          carro_id: car.id,
          novo_cartao: creditCard,
          data_retirada: pickupDate,
          horario_retirada: pickupTime,
          data_devolucao: returnDate,
          horario_devolucao: returnTime,
        };

    try {
      const availabilityResponse = await axios.post(`${apiBaseUrl}/agendamentos/verificar-disponibilidade/`, {
        carro_id: car.id,
        data_retirada: pickupDate,
        horario_retirada: pickupTime,
        data_devolucao: returnDate,
        horario_devolucao: returnTime,
      }, {
        headers: { Authorization: `Token ${token}` }
      });

      if (availabilityResponse.data.disponivel) {
        await axios.post(`${apiBaseUrl}/agendamentos/reservar/aluguel/`, data, {
          headers: { Authorization: `Token ${token}` }
        });
        handleSuccess();
      } else {
        setErrorMessage("Este carro já está reservado para o período selecionado.");
      }
    } catch (error) {
      setErrorMessage('Erro ao reservar aluguel: ' + (error.response?.data?.error || error.message));
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (!car) {
    return <p>Carregando...</p>;
  }

  const images = [car.image_url_1, car.image_url_2, car.image_url_3, car.image_url_4].filter(url => url && url !== '');

  return (
    <div className="anuncio-carro">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img className='sucesso' src='/sucesso.png' alt='Sucesso' />
            <h2>Agendamento Realizado com Sucesso!</h2>
            <p>Vá até a loja para concluir seu agendamento!</p>
            <button className='botao-retornar' onClick={handleClosePopup}>Voltar à tela inicial</button>
          </div>
        </div>
      )}
      {/* Verificar o número de imagens e exibir o carrossel ou imagem única */}
      {images.length > 1 ? (
        <Carrossel featuredCars={images.map(image => ({ image }))} />
      ) : (
        <img className='quadro-imagem' src={images[0]} alt="Imagem do carro" />
      )}
      <div className={`infos ${showPopup ? 'blurred' : ''}`}>
        <h1 className='titulo-carro-1'>{car.year} {car.brand} {car.model}</h1>
        <p className='quilometragem'>{car.mileage.toLocaleString('pt-BR')} Km</p>
        {car.is_for_sale && <p className='preco-venda'>Compra: R$ {Number(car.purchase_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>}
        {car.is_for_rent && <p className='preco-aluguel'>Aluguel: R$ {Number(car.rental_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por dia</p>}

        {activeForm === '' && (
          <>
            <button className='botao-venda' onClick={() => handleAuthentication('visita')}>Agende uma Visita</button>
            {car.is_for_sale && <button className='botao-venda' onClick={() => handleAuthentication('reserva')}>Reserve o Veículo</button>}
            {car.is_for_rent && <button className='botao-aluguel' onClick={() => handleAuthentication('aluguel')}>Reserve seu Aluguel</button>}
            <BotaoFavoritos />
          </>
        )}

        {activeForm === 'visita' && (
          <>
            <button onClick={() => setActiveForm('')} className='botao-back'>Voltar</button>
            <form className='form-agendamento' onSubmit={handleScheduleVisit}>
              <label>Data da Visita:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={today} required />
              <label>Horário da Visita:</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              <button type="submit" className='botao-venda'>Confirmar Visita</button>
              {errorMessage && <p className="erro">{errorMessage}</p>}
            </form>
          </>
        )}

        {activeForm === 'reserva' && (
          <>
            <button onClick={() => setActiveForm('')} className='botao-back'>Voltar</button>
            <div className='preco-total-venda'>
                <p className='preco-venda1'>Preco da reserva: R$ 1.000,00</p>
                <p>(Valor a ser descontado no momento da compra)</p>
              </div>
            <form className='form-agendamento' onSubmit={handleReserveVehicle}>
              <label>Escolha um Cartão Salvo:</label>
              <select onChange={(e) => setSelectedCard(e.target.value)}>
                <option value="">Selecione um cartão</option>
                {creditCards.map(card => (
                  <option value={card.id} key={card.id}>
                    {card.nome_cartao || `Cartão ${card.numero_cartao.slice(-4)}`} - {card.nome_titular}
                  </option>
                ))}
              </select>

              {!selectedCard && (
                <>
                  <input type="text" placeholder="Nome do Cartão" onChange={(e) => setCreditCard({ ...creditCard, nome_cartao: e.target.value })} required />
                  <input type="text" placeholder="Número do Cartão" onChange={(e) => setCreditCard({ ...creditCard, numero_cartao: e.target.value })} required />
                  <input type="text" placeholder="Nome do Titular" onChange={(e) => setCreditCard({ ...creditCard, nome_titular: e.target.value })} required />
                  <div className='data-cvv'>
                    <input type="date" placeholder="Data de Validade" onChange={(e) => setCreditCard({ ...creditCard, data_validade: e.target.value })} required />
                    <input type="text" placeholder="Código de Segurança" onChange={(e) => setCreditCard({ ...creditCard, codigo_seguranca: e.target.value })} required />
                  </div>
                  <label className='salvar-cartao'>
                    <input type="checkbox" onChange={(e) => setCreditCard({ ...creditCard, salvar_para_futuro: e.target.checked })} />
                    Salvar cartão para futuras transações
                  </label>
                </>
              )}

              <button type="submit" className='botao-venda'>Confirmar Reserva</button>
              {errorMessage && <p className="erro">{errorMessage}</p>}
            </form>
          </>
        )}

        {activeForm === 'aluguel' && (
          <>
            <div className='info-aluguel'>
              <p>Escolha a data e hora tanto para retirada quanto devolução do veículo</p>
              <p>50% do preço total pago antecipadamente</p>
            </div>
            <button onClick={() => setActiveForm('')} className='botao-back'>Voltar</button>
            <form className='form-agendamento' onSubmit={handleRentCar}>
              <div className='retirada'>
                <div className='data-retirada'>
                  <label>Data de Retirada:</label>
                  <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} min={today} required />
                </div>
                <div className='horario-retirada'>
                  <label>Horário de Retirada:</label>
                  <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
                </div>
              </div>
              <div className='devolucao'>
                <div className='data-devolucao'>
                  <label>Data de Devolução:</label>
                  <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} min={pickupDate} required />
                </div>
                <div className='horario-devolucao'>
                  <label>Horário de Devolução:</label>
                  <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required />
                </div>
              </div>

              <label>Escolha um Cartão Salvo:</label>
              <select onChange={(e) => setSelectedCard(e.target.value)}>
                <option value="">Selecione um cartão</option>
                {creditCards.map(card => (
                  <option value={card.id} key={card.id}>
                    {card.nome_cartao || `Cartão ${card.numero_cartao.slice(-4)}`} - {card.nome_titular}
                  </option>
                ))}
              </select>

              {!selectedCard && (
                <>
                  <input type="text" placeholder="Nome do Cartão" onChange={(e) => setCreditCard({ ...creditCard, nome_cartao: e.target.value })} required />
                  <input type="text" placeholder="Número do Cartão" onChange={(e) => setCreditCard({ ...creditCard, numero_cartao: e.target.value })} required />
                  <input type="text" placeholder="Nome do Titular" onChange={(e) => setCreditCard({ ...creditCard, nome_titular: e.target.value })} required />
                  <div className='data-cvv'>
                    <input type="date" placeholder="Data de Validade" onChange={(e) => setCreditCard({ ...creditCard, data_validade: e.target.value })} required />
                    <input type="text" placeholder="Código de Segurança" onChange={(e) => setCreditCard({ ...creditCard, codigo_seguranca: e.target.value })} required />
                  </div>
                  <label className='salvar-cartao'>
                    <input className='input-save' type="checkbox" onChange={(e) => setCreditCard({ ...creditCard, salvar_para_futuro: e.target.checked })} />
                    Salvar cartão para futuras transações
                  </label>
                </>
              )}
              <div className='preco-total-aluguel1'>
                <p className='preco-total-aluguel'>Preço total do aluguel: R$ {Number(car.rental_price * (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className='preco-total-aluguel'>Preço da reserva: R$ {Number(car.rental_price * (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 2 * 24)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <button type="submit" className='botao-aluguel'>Confirmar Reserva de Aluguel</button>
              {errorMessage && <p className="erro">{errorMessage}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

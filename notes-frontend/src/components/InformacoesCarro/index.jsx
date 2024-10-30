// components/InformacoesCarro.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import BotaoFavoritos from '../BotaoFavoritos';
import useCarActions from './hooks/useCarActions';
import Carrossel from '../Carrossel';

export default function InformacoesCarro() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const {
    handleAuthentication,
    handleSuccess,
    handleClosePopup,
    handleScheduleVisit,
    handleReserveVehicle,
    handleRentCar,
    activeForm,
    setActiveForm,
    creditCard,
    setCreditCard
  } = useCarActions({ car, setShowPopup, setErrorMessage });

  useEffect(() => {
    axios.get(`http://localhost:8000/cars/${id}/`)
      .then(response => setCar(response.data))
      .catch(error => console.error('Erro ao buscar o carro:', error));

    const fetchCreditCards = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:8000/cartaodecredito/listar/', {
          headers: { Authorization: `Token ${token}` },
        });
        setCreditCards(response.data);
      }
    };
    fetchCreditCards();
  }, [id]);

  if (!car) {
    return <p>Carregando...</p>;
  }

  // Filtrar as imagens válidas
  const images = [car.image_url_1, car.image_url_2, car.image_url_3].filter(url => url && url !== '');

  return (
    <div className="anuncio-carro">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
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
          <form className='form-agendamento' onSubmit={(e) => {
            e.preventDefault();
            handleScheduleVisit(date, time);
          }}>
            <label>Data da Visita:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <label>Horário da Visita:</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            <button type="submit" className='botao-venda'>Confirmar Visita</button>
            {errorMessage && <p className="erro">{errorMessage}</p>}
          </form>
        )}

        {activeForm === 'reserva' && (
          <form className='form-agendamento' onSubmit={(e) => {
            e.preventDefault();
            handleReserveVehicle(selectedCard, creditCard);
          }}>
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
        )}
      </div>
    </div>
  );
}

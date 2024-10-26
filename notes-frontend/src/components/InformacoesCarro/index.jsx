import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import BotaoFavoritos from '../BotaoFavoritos';

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
  });
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleAuthentication = (action) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/loginCliente');
    } else {
      setActiveForm(action);
    }
  };

  const handleScheduleVisit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/agendamentos/agendar/visita/', {
        carro_id: car.id,
        data: date,
        horario: time,
      }, {
        headers: { Authorization: `Token ${token}` }
      });
      alert('Visita agendada com sucesso!');
      setActiveForm('');
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
      await axios.post('http://localhost:8000/agendamentos/reservar/veiculo/', data, {
        headers: { Authorization: `Token ${token}` }
      });
      alert('Reserva de veículo realizada com sucesso!');
      setActiveForm('');
    } catch (error) {
      setErrorMessage('Erro ao reservar veículo: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleRentCar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const rentalDays = (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);
    const totalPrice = rentalDays * car.rental_price;
    const partialPayment = totalPrice / 2;

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
      await axios.post('http://localhost:8000/agendamentos/reservar/aluguel/', data, {
        headers: { Authorization: `Token ${token}` }
      });
      alert(`Aluguel reservado com pagamento parcial de R$${partialPayment.toFixed(2)}`);
      setActiveForm('');
    } catch (error) {
      setErrorMessage('Erro ao reservar aluguel: ' + (error.response?.data?.error || error.message));
    }
  };

  if (!car) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="anuncio-carro">
      <img className='quadro-imagem' src={car.image_url || '/default-image.jpg'} alt={car.model} />
      <div className='infos'>
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
          <form className='form-agendamento' onSubmit={handleScheduleVisit}>
            <label>Data da Visita:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <label>Horário da Visita:</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            <button type="submit" className='botao-venda'>Confirmar Visita</button>
            {errorMessage && <p className="erro">{errorMessage}</p>}
          </form>
        )}

        {activeForm === 'reserva' && (
          <form className='form-agendamento' onSubmit={handleReserveVehicle}>
            <label>Escolha um Cartão Salvo:</label>
            <select onChange={(e) => setSelectedCard(e.target.value)}>
              <option value="">Selecione um cartão</option>
              {creditCards.map(card => (
                <option value={card.id} key={card.id}>
                  {card.numero_cartao} - {card.nome_titular}
                </option>
              ))}
            </select>

            {!selectedCard && (
              <>
                <input type="text" placeholder="Número do Cartão" onChange={(e) => setCreditCard({ ...creditCard, numero_cartao: e.target.value })} required />
                <input type="text" placeholder="Nome do Titular" onChange={(e) => setCreditCard({ ...creditCard, nome_titular: e.target.value })} required />
                <input type="date" placeholder="Data de Validade" onChange={(e) => setCreditCard({ ...creditCard, data_validade: e.target.value })} required />
                <input type="text" placeholder="Código de Segurança" onChange={(e) => setCreditCard({ ...creditCard, codigo_seguranca: e.target.value })} required />
                <label>
                  <input type="checkbox" onChange={(e) => setCreditCard({ ...creditCard, salvar_para_futuro: e.target.checked })} />
                  Salvar cartão para futuras transações
                </label>
              </>
            )}
            <button type="submit" className='botao-venda'>Confirmar Reserva</button>
            {errorMessage && <p className="erro">{errorMessage}</p>}
          </form>
        )}

        {activeForm === 'aluguel' && (
          <form className='form-agendamento' onSubmit={handleRentCar}>
            <label>Data de Retirada:</label>
            <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
            <label>Horário de Retirada:</label>
            <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />

            <label>Data de Devolução:</label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
            <label>Horário de Devolução:</label>
            <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required />

            <label>Escolha um Cartão Salvo:</label>
            <select onChange={(e) => setSelectedCard(e.target.value)}>
              <option value="">Selecione um cartão</option>
              {creditCards.map(card => (
                <option value={card.id} key={card.id}>
                  {card.numero_cartao} - {card.nome_titular}
                </option>
              ))}
            </select>

            {!selectedCard && (
              <>
                <input type="text" placeholder="Número do Cartão" onChange={(e) => setCreditCard({ ...creditCard, numero_cartao: e.target.value })} required />
                <input type="text" placeholder="Nome do Titular" onChange={(e) => setCreditCard({ ...creditCard, nome_titular: e.target.value })} required />
                <input type="date" placeholder="Data de Validade" onChange={(e) => setCreditCard({ ...creditCard, data_validade: e.target.value })} required />
                <input type="text" placeholder="Código de Segurança" onChange={(e) => setCreditCard({ ...creditCard, codigo_seguranca: e.target.value })} required />
                <label>
                  <input type="checkbox" onChange={(e) => setCreditCard({ ...creditCard, salvar_para_futuro: e.target.checked })} />
                  Salvar cartão para futuras transações
                </label>
              </>
            )}
            <button type="submit" className='botao-aluguel'>Confirmar Reserva de Aluguel</button>
            {errorMessage && <p className="erro">{errorMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

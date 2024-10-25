import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import BotaoFavoritos from '../BotaoFavoritos';

export default function InformacoesCarro() {
  const { id } = useParams();  // Pega o ID do carro a partir da URL
  const [car, setCar] = useState(null);
  const [isScheduling, setIsScheduling] = useState(false);  // Estado para controlar a exibição do formulário de agendamento/compra
  const [isRenting, setIsRenting] = useState(false);  // Estado para controlar a exibição do formulário de aluguel
  const [date, setDate] = useState('');  // Data da visita/agendamento
  const [time, setTime] = useState('');  // Horário da visita/agendamento
  const [pickupDate, setPickupDate] = useState('');  // Data de retirada para aluguel
  const [returnDate, setReturnDate] = useState('');  // Data de devolução para aluguel
  const [pickupTime, setPickupTime] = useState('');  // Horário de retirada
  const [returnTime, setReturnTime] = useState('');  // Horário de devolução
  const [errorMessage, setErrorMessage] = useState('');  // Para exibir erros ao usuário

  useEffect(() => {
    // Faz a requisição para buscar as informações do carro pelo ID
    axios.get(`http://localhost:8000/cars/${id}/`)
      .then(response => {
        setCar(response.data);  // Define o estado com os dados do carro
      })
      .catch(error => {
        console.error('Erro ao buscar o carro:', error);
      });
  }, [id]);

  if (!car) {
    return <p>Carregando...</p>;  // Mostra um texto de carregamento enquanto os dados não chegam
  }

  // Função para lidar com o agendamento de visitas (venda)
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');  // Pega o token do usuário logado
    
    if (!token) {
      setErrorMessage('Usuário não autenticado. Faça login para agendar.');
      return;
    }

    const agendamentoData = {
      carro_id: car.id,  // ID do carro sendo agendado
      data: date,
      horario: time,
      tipo: 'venda'  // Agendamento de venda
    };
  
    axios.post('http://localhost:8000/agendamentos/agendar/', agendamentoData, {
      headers: {
        Authorization: `Token ${token}`  // Envia o token no cabeçalho da requisição
      }
    })
    .then(response => {
      alert('Visita agendada com sucesso!');  // Exibe um alerta de sucesso
      setErrorMessage('');  // Limpa a mensagem de erro
    })
    .catch(error => {
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        setErrorMessage('Você precisa estar logado para agendar uma visita.');
      } else {
        setErrorMessage('Erro ao agendar a visita. Tente novamente.');
      }
      console.error('Erro ao agendar a visita:', error);
    });
  };

  // Função para lidar com a reserva de aluguel
  const handleRentSubmit = (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');  // Pega o token do usuário logado
    
    if (!token) {
      setErrorMessage('Usuário não autenticado. Faça login para reservar.');
      return;
    }

    const aluguelData = {
      carro_id: car.id,
      data_retirada: pickupDate,
      horario_retirada: pickupTime,
      data_devolucao: returnDate,
      horario_devolucao: returnTime,
      tipo: 'aluguel'
    };
    
    axios.post('http://localhost:8000/agendamentos/agendar/', aluguelData, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(response => {
      alert('Aluguel agendado com sucesso!');
      setErrorMessage('');
    })
    .catch(error => {
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        setErrorMessage('Você precisa estar logado para reservar.');
      } else {
        setErrorMessage('Erro ao reservar o carro. Tente novamente.');
      }
      console.error('Erro ao reservar o carro:', error);
    });
  };

  return (
    <>
      <div className="anuncio-carro">
        <img className='quadro-imagem' src={car.image_url || '/default-image.jpg'} alt={car.model} />
        <div className='infos'>
          <h1 className='titulo'>{car.year} {car.brand} {car.model}</h1>
          <p className='quilometragem'>{car.mileage.toLocaleString('pt-BR')} Km</p>
          {car.is_for_sale && <p className='preco-venda'>Compra: R$ {Number(car.purchase_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>}
          {car.is_for_rent && <p className='preco-aluguel'>Aluguel: R$ {Number(car.rental_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por dia</p>}
          
          {/* Se isScheduling for true, mostrar o formulário de visita (venda) */}
          {isScheduling ? (
            <form className='form-agendamento' onSubmit={handleScheduleSubmit}>
              <img src='/de-volta.png' alt='Fechar' className='fechar' onClick={() => setIsScheduling(false)} />

              <label>
                Data da visita:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </label>
              <label>
                Horário da visita:
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </label>
              
              {/* Mostrar o preço total do carro logo abaixo do formulário */}
              <button type="submit" className='botao-venda'>Confirmar Visita</button>

              {/* Exibe a mensagem de erro, se houver */}
              {errorMessage && <p className="erro">{errorMessage}</p>}
            </form>
          ) : isRenting ? (
            <form className='form-agendamento' onSubmit={handleRentSubmit}>
              <img src='/de-volta.png' alt='Fechar' className='fechar' onClick={() => setIsRenting(false)} />
              <label>
                Data de Retirada:
                <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
              </label>
              <label>
                Horário de Retirada:
                <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
              </label>
              <label>
                Data de Devolução:
                <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
              </label>
              <label>
                Horário de Devolução:
                <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required />
              </label>

              {/* Mostrar o preço total do aluguel logo abaixo do formulário multiplicando pela diferença de dias  apenas depois de escolher os dois dias*/}
              <p className='preco-aluguel-total'>Total: R$ {Number(car.rental_price * (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

              
              <button type="submit" className='botao-aluguel'>Confirmar Reserva</button>

              {/* Exibe a mensagem de erro, se houver */}
              {errorMessage && <p className="erro">{errorMessage}</p>}
            </form>
          ) : (
            <>
              {/* Botões de ação: Agendar Visita ou Reservar Aluguel */}
              {car.is_for_sale && <button className='botao-venda' onClick={() => setIsScheduling(true)}><span className="texto-venda">Reserve sua Compra</span></button>}  
              {car.is_for_rent && <button className='botao-aluguel' onClick={() => setIsRenting(true)}><span className="texto-aluguel">Reserve seu Aluguel</span></button>}
            </>
          )}

          <BotaoFavoritos />
        </div>
      </div>
    </>
  );
}

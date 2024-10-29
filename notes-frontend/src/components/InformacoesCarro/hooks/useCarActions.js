// hooks/useCarActions.js

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function useCarActions({ car, setShowPopup, setErrorMessage }) {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('');
  const [creditCard, setCreditCard] = useState({
    numero_cartao: '',
    nome_titular: '',
    data_validade: '',
    codigo_seguranca: '',
    salvar_para_futuro: false,
    nome_cartao: ''
  });

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

  const handleScheduleVisit = async (date, time) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/agendamentos/agendar/visita/', {
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

  const handleReserveVehicle = async (selectedCard, creditCard) => {
    const token = localStorage.getItem('token');
    const data = selectedCard
      ? { carro_id: car.id, cartao_id: selectedCard }
      : { carro_id: car.id, novo_cartao: creditCard };

    try {
      await axios.post('http://localhost:8000/agendamentos/reservar/veiculo/', data, {
        headers: { Authorization: `Token ${token}` }
      });

      await axios.put(`http://localhost:8000/cars/${car.id}/`, { is_reserved: true }, {
        headers: { Authorization: `Token ${token}` }
      });

      handleSuccess();
    } catch (error) {
      setErrorMessage('Erro ao reservar veículo: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleRentCar = async (data) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/agendamentos/reservar/aluguel/', data, {
        headers: { Authorization: `Token ${token}` }
      });
      handleSuccess();
    } catch (error) {
      setErrorMessage('Erro ao reservar aluguel: ' + (error.response?.data?.error || error.message));
    }
  };

  return {
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
  };
}

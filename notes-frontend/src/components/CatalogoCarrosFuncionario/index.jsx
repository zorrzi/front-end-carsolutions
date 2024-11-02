// components/CatalogoCarrosFuncionario.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarroFuncionario from '../CarroFuncionario';
import './index.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CatalogoCarrosFuncionario() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCars, setSelectedCars] = useState([]);
  const [showDiscountOptions, setShowDiscountOptions] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadCars = () => {
    axios.get(`${apiBaseUrl}/cars/`)
      .then(response => setCars(response.data))
      .catch(error => console.error('Erro ao buscar os carros:', error));
  };

  useEffect(() => {
    loadCars();
  }, []);

  const toggleCarSelection = (id) => {
    setSelectedCars(prevSelectedCars =>
      prevSelectedCars.includes(id)
        ? prevSelectedCars.filter(carId => carId !== id)
        : [...prevSelectedCars, id]
    );
  };

  const deleteSelectedCars = () => {
    axios
      .delete(`${apiBaseUrl}/cars/delete-em-massa/`, { data: { ids: selectedCars } })
      .then(() => {
        setSelectedCars([]);
        loadCars();
      })
      .catch(error => console.error('Erro ao apagar os carros:', error));
  };

  const applyDiscount = () => {
    const discountValue = parseFloat(discountPercentage);

    if (isNaN(discountValue) || discountValue < 0 || discountValue > 15) {
      setErrorMessage('O desconto deve estar entre 0% e 15%.');
      return;
    }

    axios.post(`${apiBaseUrl}/cars/apply-discount/`, {
      ids: selectedCars,
      discount_type: discountType,
      discount_percentage: discountValue / 100
    })
    .then(() => {
      setSelectedCars([]);
      setDiscountType('');
      setDiscountPercentage('');
      setShowDiscountOptions(false);
      setErrorMessage('');
      loadCars();
    })
    .catch(error => console.error('Erro ao aplicar desconto:', error));
  };

  const filteredCars = cars.filter(car =>
    `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalogo">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar veículo pela marca ou modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="actions-container">
        <button
          className='button'
          onClick={deleteSelectedCars}
          disabled={selectedCars.length === 0}
        >
          Apagar Selecionados
        </button>
        
        <button
          className='button'
          onClick={() => setShowDiscountOptions(!showDiscountOptions)}
          disabled={selectedCars.length === 0}
        >
          Aplicar Desconto
        </button>
      </div>

      {showDiscountOptions && (
        <div className="discount-options">
          <input
            className='discount-input'
            type="number"
            min="0"
            max="15"
            step="0.01"
            placeholder="Desconto (%)"
            value={discountPercentage} 
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />
          <div className='checkboxes'>
            <label className='input-discount-checkbox'>
              <input
                type="radio"
                name="discountType"
                value="purchase"
                checked={discountType === 'purchase'}
                onChange={() => setDiscountType('purchase')}
              />
              Desconto na Compra
            </label>
            <label className='input-discount-checkbox'>
              <input
                type="radio"
                name="discountType"
                value="rental"
                checked={discountType === 'rental'}
                onChange={() => setDiscountType('rental')}
              />
              Desconto no Aluguel
            </label>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            className='button'
            onClick={applyDiscount}
            disabled={!discountType || discountPercentage === ''}
          >
            Confirmar Desconto
          </button>
        </div>
      )}

      <div className="catalogo-carros-func">
        {filteredCars.length === 0 ? (
          <p>Nenhum carro encontrado</p>
        ) : (
          filteredCars.map(car => (
            <CarroFuncionario
              key={car.id}
              car={car}
              loadCars={loadCars}
              isSelected={selectedCars.includes(car.id)}
              toggleSelection={() => toggleCarSelection(car.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

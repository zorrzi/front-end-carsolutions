import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import CarroCliente from '../CarroCliente';
import './index.css';

export default function CatalogoCarrosCliente() {
  // Carregar estado inicial do localStorage, se disponível
  const initialFilters = {
    isForSale: localStorage.getItem('isForSale') === 'false' ? false : true,
    isForRent: localStorage.getItem('isForRent') === 'false' ? false : true,
    minRentPrice: 0,
    maxRentPrice: 1000,
    minSalePrice: 5000,
    maxSalePrice: 100000,
    minMileage: 0,
    maxMileage: 200000,
    brand: '',
    model: '',
    year: '',
  };

  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  // Salvar mudanças no localStorage e atualizar o estado de filtros
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    // Atualizar localStorage para isForSale e isForRent
    if (name === 'isForSale' || name === 'isForRent') {
      localStorage.setItem(name, newValue);
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }));
  };

  // Função para buscar carros, ignorando filtros de preço de aluguel ou venda se não estiverem habilitados
  const fetchCars = useCallback(
    debounce(() => {
      const query = Object.keys(filters)
        .filter((key) => {
          // Ignora os filtros de preço de aluguel se a checkbox de aluguel não estiver marcada
          if (!filters.isForRent && (key === 'minRentPrice' || key === 'maxRentPrice')) return false;
          // Ignora os filtros de preço de venda se a checkbox de venda não estiver marcada
          if (!filters.isForSale && (key === 'minSalePrice' || key === 'maxSalePrice')) return false;
          return true;
        })
        .map((key) => `${key}=${filters[key]}`)
        .join('&');
        
      axios.get(`http://127.0.0.1:8000/cars/catalogo/?${query}`)
        .then(response => {
          setCars(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar os carros:', error);
        });
    }, 300), // 300 ms debounce
    [filters]
  );

  useEffect(() => {
    fetchCars();
    return fetchCars.cancel; // Cancel debounce no cleanup
  }, [filters, fetchCars]);

  return (
    <div className='dividir'>
      <div className="filters-container">
        <label>
          <input
            type="checkbox"
            name="isForSale"
            checked={filters.isForSale}
            onChange={handleFilterChange}
          />
          Disponível para Venda
        </label>
        <label>
          <input
            type="checkbox"
            name="isForRent"
            checked={filters.isForRent}
            onChange={handleFilterChange}
          />
          Disponível para Aluguel
        </label>
  
        <label>Faixa de Preço para Aluguel: {filters.minRentPrice} - {filters.maxRentPrice}</label>
        <input
          type="range"
          name="minRentPrice"
          min="0"
          max="5000"
          value={filters.minRentPrice}
          onChange={handleFilterChange}
          disabled={!filters.isForRent} // Desabilita o slider se "Disponível para Aluguel" não estiver marcado
        />
        <input
          type="range"
          name="maxRentPrice"
          min="0"
          max="5000"
          value={filters.maxRentPrice}
          onChange={handleFilterChange}
          disabled={!filters.isForRent} // Desabilita o slider se "Disponível para Aluguel" não estiver marcado
        />
  
        <label>Faixa de Preço para Venda: {filters.minSalePrice} - {filters.maxSalePrice}</label>
        <input
          type="range"
          name="minSalePrice"
          min="5000"
          max="100000"
          value={filters.minSalePrice}
          onChange={handleFilterChange}
          disabled={!filters.isForSale} // Desabilita o slider se "Disponível para Venda" não estiver marcado
        />
        <input
          type="range"
          name="maxSalePrice"
          min="5000"
          max="100000"
          value={filters.maxSalePrice}
          onChange={handleFilterChange}
          disabled={!filters.isForSale} // Desabilita o slider se "Disponível para Venda" não estiver marcado
        />
  
        <label>Faixa de Quilometragem: {filters.minMileage} - {filters.maxMileage}</label>
        <input
          type="range"
          name="minMileage"
          min="0"
          max="300000"
          value={filters.minMileage}
          onChange={handleFilterChange}
        />
        <input
          type="range"
          name="maxMileage"
          min="0"
          max="300000"
          value={filters.maxMileage}
          onChange={handleFilterChange}
        />
  
        <label>Marca</label>
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
        />
  
        <label>Modelo</label>
        <input
          type="text"
          name="model"
          value={filters.model}
          onChange={handleFilterChange}
        />
  
        <label>Ano</label>
        <input
          type="text"
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
        />
      </div>
  
      <div className="catalogo-carros">
        {cars.length === 0 ? (
          <p>Nenhum carro disponível</p>
        ) : (
          cars.map((car) => (
            <CarroCliente className="card-carro" key={car.id} car={car} />
          ))
        )}
      </div>
    </div>
  );
}

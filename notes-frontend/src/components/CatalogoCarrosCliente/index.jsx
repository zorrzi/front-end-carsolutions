import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
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
  const [appliedFilters, setAppliedFilters] = useState(initialFilters); // Armazena filtros aplicados

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

  // Função para buscar carros com base nos filtros aplicados
  const fetchCars = useCallback(() => {
    const query = Object.keys(appliedFilters)
      .filter((key) => {
        // Ignora os filtros de preço de aluguel se a checkbox de aluguel não estiver marcada
        if (!appliedFilters.isForRent && (key === 'minRentPrice' || key === 'maxRentPrice')) return false;
        // Ignora os filtros de preço de venda se a checkbox de venda não estiver marcada
        if (!appliedFilters.isForSale && (key === 'minSalePrice' || key === 'maxSalePrice')) return false;
        return true;
      })
      .map((key) => `${key}=${appliedFilters[key]}`)
      .join('&');
      
    axios.get(`http://127.0.0.1:8000/cars/catalogo/?${query}`)
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os carros:', error);
      });
  }, [appliedFilters]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // Função para aplicar os filtros quando o botão "Filtrar" é pressionado
  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  return (
    <div className='dividir'>
      <div className="filters-container">
        {/* Filtros de Marca, Modelo e Ano no topo */}
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

        {/* Checkboxes para Disponibilidade */}
        <label className='check-aluguel'>
          <input className='checkbox'
            type="checkbox"
            name="isForSale"
            checked={filters.isForSale}
            onChange={handleFilterChange}
          />
          Disponível para Venda
        </label>

        {/* Faixa de Preço para Venda - exibida apenas se "Disponível para Venda" estiver marcado */}
        {filters.isForSale && (
          <>
            <label className='range'>
              <p>Faixa de Preço para Venda:</p>
              <p>R$ {Number(filters.minSalePrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - R$ {Number(filters.maxSalePrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </label>
            
            <input
              type="range"
              name="minSalePrice"
              min="5000"
              max="100000"
              value={filters.minSalePrice}
              onChange={handleFilterChange}
            />
            <input
              type="range"
              name="maxSalePrice"
              min="5000"
              max="100000"
              value={filters.maxSalePrice}
              onChange={handleFilterChange}
            />
          </>
        )}

        <label>
          <input
            className='checkbox'
            type="checkbox"
            name="isForRent"
            checked={filters.isForRent}
            onChange={handleFilterChange}
          />
          Disponível para Aluguel
        </label>
  
        {/* Faixa de Preço para Aluguel - exibida apenas se "Disponível para Aluguel" estiver marcado */}
        {filters.isForRent && (
          <>
            <label className='range'>
              <p>Faixa de Preço para Aluguel:</p>
              <p>R$ {Number(filters.minRentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - R$ {Number(filters.maxRentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </label>
            <input
              type="range"
              name="minRentPrice"
              min="0"
              max="5000"
              value={filters.minRentPrice}
              onChange={handleFilterChange}
            />
            <input
              type="range"
              name="maxRentPrice"
              min="0"
              max="5000"
              value={filters.maxRentPrice}
              onChange={handleFilterChange}
            />
          </>
        )}
  
        {/* Faixa de Quilometragem */}
        <label className='rang'>
          <p>Faixa de Quilometragem:</p> 
          <p>{Number(filters.minMileage).toLocaleString('pt-BR')} km - {Number(filters.maxMileage).toLocaleString('pt-BR')} km</p>
        </label>
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
        
        {/* Botão para aplicar filtros */}
        <button className='filtrar-btn' onClick={applyFilters}>Filtrar</button>
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

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CarroCliente from '../CarroCliente';
import './index.css';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; 

export default function CatalogoCarrosCliente() {
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
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'isForSale' || name === 'isForRent') {
      localStorage.setItem(name, newValue);
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }));
  };

  const fetchCars = useCallback(() => {
    const query = Object.keys(appliedFilters)
      .filter((key) => {
        if (!appliedFilters.isForRent && (key === 'minRentPrice' || key === 'maxRentPrice')) return false;
        if (!appliedFilters.isForSale && (key === 'minSalePrice' || key === 'maxSalePrice')) return false;
        return true;
      })
      .map((key) => `${key}=${appliedFilters[key]}`)
      .join('&');
      
    axios.get(`${apiBaseUrl}/cars/catalogo/?${query}`)
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

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  return (
    <div className='dividir'>
      <div className="filters-container">
        <label>Marca</label>
        <input type="text" name="brand" value={filters.brand} onChange={handleFilterChange} />

        <label>Modelo</label>
        <input type="text" name="model" value={filters.model} onChange={handleFilterChange} />

        <label>Ano</label>
        <input type="text" name="year" value={filters.year} onChange={handleFilterChange} />

        <label className='check-aluguel'>
          <input className='checkbox' type="checkbox" name="isForSale" checked={filters.isForSale} onChange={handleFilterChange} />
          Disponível para Venda
        </label>
        <label>
          <input className='checkbox' type="checkbox" name="isForRent" checked={filters.isForRent} onChange={handleFilterChange} />
          Disponível para Aluguel
        </label>
  
        <label className='range'><p>Faixa de Preço para Aluguel:</p><p>{filters.minRentPrice} - {filters.maxRentPrice}</p></label>
        <input type="range" name="minRentPrice" min="0" max="5000" value={filters.minRentPrice} onChange={handleFilterChange} disabled={!filters.isForRent} />
        <input type="range" name="maxRentPrice" min="0" max="5000" value={filters.maxRentPrice} onChange={handleFilterChange} disabled={!filters.isForRent} />
  
        <label className='range'><p>Faixa de Preço para Venda:</p><p>{filters.minSalePrice} - {filters.maxSalePrice}</p></label>
        <input type="range" name="minSalePrice" min="5000" max="100000" value={filters.minSalePrice} onChange={handleFilterChange} disabled={!filters.isForSale} />
        <input type="range" name="maxSalePrice" min="5000" max="100000" value={filters.maxSalePrice} onChange={handleFilterChange} disabled={!filters.isForSale} />
  
        <label className='rang'><p>Faixa de Quilometragem:</p><p>{filters.minMileage} - {filters.maxMileage}</p></label>
        <input type="range" name="minMileage" min="0" max="300000" value={filters.minMileage} onChange={handleFilterChange} />
        <input type="range" name="maxMileage" min="0" max="300000" value={filters.maxMileage} onChange={handleFilterChange} />
        
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

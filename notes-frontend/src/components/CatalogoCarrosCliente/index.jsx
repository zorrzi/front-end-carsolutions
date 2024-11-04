import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CarroCliente from '../CarroCliente';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import { useLocation } from 'react-router-dom'; 

export default function CatalogoCarrosCliente() {

  // Pega os parâmetros da URL (ano, marca, modelo)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ano = searchParams.get('ano');
  const marca = searchParams.get('marca');
  const modelo = searchParams.get('modelo');

  const initialFilters = {
    isForSale: localStorage.getItem('isForSale') === 'false',
    isForRent: localStorage.getItem('isForRent') === 'false',
    minRentPrice: 0,
    maxRentPrice: 1000,
    startDate: '',
    endDate: '',
    minSalePrice: 5000,
    maxSalePrice: 300000,
    minMileage: 0,
    maxMileage: 200000,
    brand: marca || '',
    model: modelo || '',
    year: ano || '',
  };

  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;

    if (name === 'isForSale') {
      localStorage.setItem('isForSale', checked);
      setFilters((prevFilters) => ({
        ...prevFilters,
        isForSale: checked,
        isForRent: checked ? false : prevFilters.isForRent, // Desmarca 'isForRent' apenas se 'isForSale' for marcado
      }));
    } else if (name === 'isForRent') {
      localStorage.setItem('isForRent', checked);
      setFilters((prevFilters) => ({
        ...prevFilters,
        isForRent: checked,
        isForSale: checked ? false : prevFilters.isForSale, // Desmarca 'isForSale' apenas se 'isForRent' for marcado
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: e.target.value,
      }));
    }
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

        {/* Checkboxes para Disponibilidade */}
        <label className='check-aluguel'>
          <input className='checkbox' type="checkbox" name="isForSale" checked={filters.isForSale} onChange={handleFilterChange} />
          Disponível para Venda
        </label>
        <label>
          <input className='checkbox' type="checkbox" name="isForRent" checked={filters.isForRent} onChange={handleFilterChange} />
          Disponível para Aluguel
        </label>

        {/* Faixa de Preço para Venda - exibida apenas se "Disponível para Venda" estiver marcado */}
        {filters.isForSale && (
          <>
            <label className='range'>
              <p>Faixa de Preço para Venda:</p>
              <p>R$ {Number(filters.minSalePrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - R$ {Number(filters.maxSalePrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </label>
            <input type="range" name="minSalePrice" min="5000" max="300000" value={filters.minSalePrice} onChange={handleFilterChange} />
            <input type="range" name="maxSalePrice" min="5000" max="300000" value={filters.maxSalePrice} onChange={handleFilterChange} />
          </>
        )}


        {/* Faixa de Preço para Aluguel - exibida apenas se "Disponível para Aluguel" estiver marcado */}
        {filters.isForRent && (
          <>
            <label className='range'>
              <p>Faixa de Preço para Aluguel:</p>
              <p>R$ {Number(filters.minRentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - R$ {Number(filters.maxRentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </label>
            <input type="range" name="minRentPrice" min="0" max="5000" value={filters.minRentPrice} onChange={handleFilterChange} />
            <input type="range" name="maxRentPrice" min="0" max="5000" value={filters.maxRentPrice} onChange={handleFilterChange} />

            <label>Data de Início</label>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />

            <label>Data de Fim</label>
            <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
          </>
        )}
  
        {/* Faixa de Quilometragem */}
        <label className='rang'><p>Faixa de Quilometragem:</p><p>{Number(filters.minMileage).toLocaleString('pt-BR')} km - {Number(filters.maxMileage).toLocaleString('pt-BR')} km</p></label>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarroFuncionario from '../CarroFuncionario';
import './index.css';

export default function CatalogoCarrosFuncionario() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

  const loadCars = () => {
    axios.get('http://localhost:8000/cars/')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os carros:', error);
      });
  };

  useEffect(() => {
    loadCars();
  }, []);

  // Filtra os carros com base no termo de busca (marca ou modelo)
  const filteredCars = cars.filter(car =>
    `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='catalogo'>
      {/* Campo de busca */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar veículo pela marca ou modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Lista de carros filtrados */}
      <div className="catalogo-carros">
        {filteredCars.length === 0 ? (
          <p>Nenhum carro encontrado</p>
        ) : (
          filteredCars.map(car => (
            <CarroFuncionario key={car.id} car={car} loadCars={loadCars} />
          ))
        )}
      </div>
    </div>
  );
}

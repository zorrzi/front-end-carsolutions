import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarroFuncionario from '../CarroFuncionario';
import './index.css';

export default function CatalogoCarrosFuncionario() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCars, setSelectedCars] = useState([]); // Estado para armazenar os carros selecionados

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

  const toggleCarSelection = (id) => {
    setSelectedCars(prevSelectedCars =>
      prevSelectedCars.includes(id)
        ? prevSelectedCars.filter(carId => carId !== id)
        : [...prevSelectedCars, id]
    );
  };

  const deleteSelectedCars = () => {
    axios
      .delete('http://localhost:8000/cars/delete-em-massa/', { data: { ids: selectedCars } })
      .then(() => {
        setSelectedCars([]);
        loadCars();
      })
      .catch(error => {
        console.error('Erro ao apagar os carros:', error);
      });
  };

  const filteredCars = cars.filter(car =>
    `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalogo">
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

      {/* Botão para apagar carros selecionados */}
      <div className="actions-container">
        <button className='button' onClick={deleteSelectedCars} disabled={selectedCars.length === 0}>
          Apagar Selecionados
        </button>
      </div>

      {/* Lista de carros filtrados */}
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

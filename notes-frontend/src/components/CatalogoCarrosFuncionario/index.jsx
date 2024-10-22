import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarroFuncionario from '../CarroFuncionario';

export default function CatalogoCarrosFuncionario() {
  const [cars, setCars] = useState([]);

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

  return (
    <div className="catalogo-carros">
      {cars.length === 0 ? (
        <p>Nenhum carro disponível</p>
      ) : (
        cars.map(car => (
          <CarroFuncionario key={car.id} car={car} loadCars={loadCars} />
        ))
      )}
    </div>
  );
}

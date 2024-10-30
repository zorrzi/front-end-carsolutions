import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarroCliente from '../CarroCliente';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CatalogoAluguelCliente() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/cars/`)
      .then(response => {
        const availableForRent = response.data.filter(car => car.is_for_rent);
        setCars(availableForRent);
      })
      .catch(error => {
        console.error('Erro ao buscar os carros:', error);
      });
  }, []);

  return (
    <div className="catalogo-carros">
      {cars.length === 0 ? (
        <p>Nenhum carro disponível para aluguel</p>
      ) : (
        cars.map((car) => (
          <CarroCliente className="card-carro" key={car.id} car={car} />
        ))
      )}
    </div>
  );
}

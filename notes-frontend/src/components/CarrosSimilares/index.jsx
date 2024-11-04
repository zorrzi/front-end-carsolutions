

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarroCliente from '../CarroCliente';
import './index.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CarrosSimilares({ carId }) {
  const [carrosSimilares, setCarrosSimilares] = useState([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/cars/${carId}/similares/`)
      .then(response => setCarrosSimilares(response.data))
      .catch(error => console.error('Erro ao buscar carros similares:', error));
  }, [carId]);

  if (carrosSimilares.length === 0) return null;

  return (
    <div className="carros-similares-container">
      <h3>Talvez Você Goste</h3>
      <div className="similares-lista">
        {carrosSimilares.map(carro => (
          <CarroCliente key={carro.id} car={carro} />
        ))}
      </div>
    </div>
  );
}

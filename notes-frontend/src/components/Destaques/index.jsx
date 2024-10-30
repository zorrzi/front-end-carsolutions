import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarroCliente from '../CarroCliente'; // Importa o componente de Card de Carro
import './index.css'; // Estilos do CatalogoCarros
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export default function Destaques() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/cars/`)
      .then(response => {
        setCars(response.data); 
      })
      .catch(error => {
        console.error('Erro ao buscar os carros:', error);
      });
  }, []);

  return (
    <div className="catalogo-carros">
      {cars.length === 0 ? (
        <p>Nenhum carro disponível</p>  // Exibe uma mensagem se não houver carros
      ) : (
        cars.map((car) => (
          <CarroCliente className="card-carro" key={car.id} car={car} />  // Renderiza um Card para cada carro
        ))
      )}
    </div>
  );
}
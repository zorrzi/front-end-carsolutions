import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarroCliente from '../CarroCliente'; // Importa o componente de Card de Carro
import './index.css'; // Estilos do CatalogoCarros

export default function CatalogoCarrosCliente() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cars/')
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
          <CarroCliente key={car.id} car={car} />  // Renderiza um Card para cada carro
        ))
      )}
    </div>
  );
}

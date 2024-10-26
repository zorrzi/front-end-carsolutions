import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarroCliente from '../CarroCliente';
import './index.css';

export default function CatalogoCompraCliente() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cars/')
      .then(response => {
        const availableForSale = response.data.filter(car => car.is_for_sale);
        setCars(availableForSale);
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

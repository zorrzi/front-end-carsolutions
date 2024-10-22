import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

export default function InformacoesCarro() {
  const { id } = useParams();  // Pega o ID do carro a partir da URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Faz a requisição para buscar as informações do carro pelo ID
    axios.get(`http://localhost:8000/cars/${id}/`)
      .then(response => {
        setCar(response.data);  // Define o estado com os dados do carro
      })
      .catch(error => {
        console.error('Erro ao buscar o carro:', error);
      });
  }, [id]);

  if (!car) {
    return <p>Carregando...</p>;  // Mostra um texto de carregamento enquanto os dados não chegam
  }

  return (
    <div className="anuncio-carro">
      <h1>{car.brand} {car.model}</h1>
      <img src={car.image_url || '/default-image.jpg'} alt={car.model} />
      <ul>
        <li><strong>Marca:</strong> {car.brand}</li>
        <li><strong>Modelo:</strong> {car.model}</li>
        <li><strong>Compra:</strong> R${car.purchase_price}</li>
        <li><strong>Aluguel:</strong> R${car.rental_price}</li>
        <li><strong>Quilometragem:</strong> {car.mileage} km</li>
        
        {/* Adicione outras informações necessárias */}
      </ul>
    </div>
  );
}

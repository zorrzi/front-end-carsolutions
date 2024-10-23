import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import BotaoFavoritos from '../BotaoFavoritos';

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
    <>
    <div className="anuncio-carro">
      <img className='quadro-imagem' src={car.image_url || '/default-image.jpg'} alt={car.model} />
      <div className='infos'>
        <h1 className='titulo'>{car.year} {car.brand} {car.model}</h1>
          <p className='quilometragem'>{car.mileage} Km</p>
          {car.is_for_sale && <span className="preco-venda">Preço para Compra: R${car.purchase_price}</span>} 
          {car.is_for_rent && <span className="preco-aluguel">Preço da Diária: R${car.rental_price}</span>}
          {car.is_for_sale && <button className='botao-venda'><span className="texto-venda">Agende sua Visita</span></button>}  
          {car.is_for_rent && <button className='botao-aluguel'><span className="texto-aluguel">Reserve seu Aluguel</span></button>}
          <BotaoFavoritos />
      </div>
    </div>
    </>
  );
}

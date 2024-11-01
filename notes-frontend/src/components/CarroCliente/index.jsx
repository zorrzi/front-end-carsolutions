// components/CarroCliente.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function CarroCliente({ car }) {
  const navigate = useNavigate();

  const handleVerMais = () => {
    navigate(`/anuncio/${car.id}`);
  };

  return (
    <div className="card">
      <div className="nome">
        <p className="card-title">{car.brand}</p>
        <p className="card-subtitle">{car.model}</p>
      </div>

      <div className="image-container">
        <img className="carro" src={car.image_url_1 || '/default-image.jpg'} alt={car.model} />
        
        {/* Ícone de desconto */}
        {(car.is_discounted_purchase || car.is_discounted_rent) && (
          <img src='desconto.png' alt="Desconto" className="discount-icon" />
        )}
      </div>

      <div className="banner-container">
        {car.is_for_rent && <span className="banner-item">Aluguel</span>}
        {car.is_for_sale && <span className="banner-item">Venda</span>}
      </div>

      <p className="card-content" onClick={handleVerMais}>Ver mais</p>
    </div>
  );
}

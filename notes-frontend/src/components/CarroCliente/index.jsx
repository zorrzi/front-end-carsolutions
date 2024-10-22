import React from 'react';
import './index.css';

export default function CarroCliente({ car }) {
  return (
    <div className="card">
      <div className="nome">
        <p className="card-title">{car.brand}</p>
        <p className="card-subtitle">{car.model}</p>
      </div>
      <div>
        <img className="carro" src={car.image_url || '/default-image.jpg'} alt={car.model} />
      </div>

      {/* Seção de banner para Aluguel e Venda */}
      <div className="banner-container">
        {car.is_for_rent && <span className="banner-item">Aluguel</span>}
        {car.is_for_sale && <span className="banner-item">Venda</span>}
      </div>

      <p className="card-content">Ver mais</p>
    </div>
  );
}

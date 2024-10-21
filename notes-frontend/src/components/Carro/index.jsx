import React from 'react';
import './index.css';

export default function Carro({ car }) {


  return (
    <div className="card">
      <div className="nome">
        <p className="card-title">{car.brand}</p>
        <p className="card-subtitle">{car.model}</p>
      </div>
      <div>
        <img className="carro" src={car.image_url || '/default-image.jpg'} alt={car.model} />
      </div>
      <p className="card-content">Ver mais</p>
    </div>
  );
}

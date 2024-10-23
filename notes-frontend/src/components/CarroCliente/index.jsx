import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function CarroCliente({ car }) {
  const navigate = useNavigate();  // Hook para navegação

  const handleVerMais = () => {
    navigate(`/anuncio/${car.id}`);  // Redireciona para a página do anúncio com o ID do carro
  };

  return (
    <div className="card">
      <div className="nome">
        <p className="card-title">{car.brand}</p>
        <p className="card-subtitle">{car.model}</p>
      </div>
      <img className="carro" src={car.image_url || '/default-image.jpg'} alt={car.model} />

      {/* Seção de banner para Aluguel e Venda */}
      <div className="banner-container">
        {car.is_for_rent && <span className="banner-item">Aluguel</span>}
        {car.is_for_sale && <span className="banner-item">Venda</span>}
      </div>

      {/* Botão de Ver Mais */}
      <p className="card-content" onClick={handleVerMais}>Ver mais</p>
    </div>
  );
}

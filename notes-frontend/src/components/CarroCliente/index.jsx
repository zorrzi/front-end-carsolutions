// components/CarroCliente.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function CarroCliente({ car }) {
  const navigate = useNavigate();

  const handleVerMais = () => {
    navigate(`/anuncio/${car.id}`);
  };

  // Calcular o preço com desconto para venda e aluguel, se aplicável
  const discountedPurchasePrice = car.is_discounted_sale
    ? car.purchase_price * (1 - car.discount_percentage_sale)
    : car.purchase_price;

  const discountedRentalPrice = car.is_discounted_rent
    ? car.rental_price * (1 - car.discount_percentage_rent)
    : car.rental_price;

  return (
    <div className="card-cliente">
      <div className="nome">
        <p className="card-title">{car.brand}</p>
        <p className="card-subtitle">{car.model}</p>
      </div>

      <div className="image-container">
        <img className="carro" src={car.image_url_1 || '/default-image.jpg'} alt={car.model} />
        
        {/* Ícone de desconto */}
        {(car.is_discounted_sale || car.is_discounted_rent) && (
          <img src='desconto.png' alt="Desconto" className="discount-icon" />
        )}
      </div>

      <div className="banner-container">
        {car.is_for_rent && <span className="banner-item">Aluguel</span>}
        {car.is_for_sale && <span className="banner-item">Venda</span>}
      </div>

      {/* Exibir preços */}
      <div className="preco-container">
        {car.is_for_sale && (
          <p className={`preco ${car.is_discounted_sale ? 'riscado' : ''}`}>
            Venda: R$ {Number(car.purchase_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        )}
        {car.is_discounted_sale && (
          <p className="preco-desconto">
            R$ {Number(discountedPurchasePrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        )}

        {car.is_for_rent && (
          <p className={`preco ${car.is_discounted_rent ? 'riscado' : ''}`}>
            Aluguel: R$ {Number(car.rental_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por dia
          </p>
        )}
        {car.is_discounted_rent && (
          <p className="preco-desconto">
            R$ {Number(discountedRentalPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por dia
          </p>
        )}
      </div>

      <p className="card-content-cliente" onClick={handleVerMais}>Ver mais</p>
    </div>
  );
}

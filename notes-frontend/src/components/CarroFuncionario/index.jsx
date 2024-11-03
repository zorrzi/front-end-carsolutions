import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CarroFuncionario({ car, loadCars, onDelete, onRemoveDiscount, isSelected, toggleSelection }) {
  return (
    <div className={`card ${isSelected ? 'selected-card' : ''}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={toggleSelection}
        className="select-checkbox" 
      />

      <div className="nome">
        <p className="card-title">{car.brand}</p>
        <p className="card-subtitle">{car.model}</p>
      </div>
      <div className="image-container">
        <img className="carro" src={car.image_url_1 || '/default-image.jpg'} alt={car.model} />
        
        {(car.is_discounted_sale || car.is_discounted_rent) && (
          <div className="discount-icon-container">
            <img src="desconto.png" alt="Desconto" className="discount-icon-func" />
            <button className="remove-discount-button" onClick={onRemoveDiscount}>X</button>
          </div>
        )}
      </div>

      <div className="banner-container">
        {car.is_for_rent && <span className="banner-item">Aluguel</span>}
        {car.is_for_sale && <span className="banner-item">Venda</span>}
      </div>

      <div className="action-buttons">
        <button className="action-button-delete" onClick={onDelete}>
          <img className='delete-img' src="/apagar.png" alt="Apagar" />
        </button>
        <Link to={`/editarCarro/${car.id}`}>
          <button className="action-button-edit">
            <img className='edit-img' src="/editar.png" alt="Editar" />
          </button>
        </Link>
      </div>
    </div>
  );
}

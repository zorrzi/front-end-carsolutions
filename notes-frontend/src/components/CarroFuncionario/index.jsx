import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; 

export default function CarroFuncionario({ car, loadCars, isSelected, toggleSelection }) {
  const deleteCar = (event) => {
    event.preventDefault();

    axios
      .delete(`${apiBaseUrl}/cars/${car.id}/`)
      .then(() => {
        loadCars(); // Recarrega os carros após a exclusão
      })
      .catch((err) => {
        console.error("Erro ao deletar o carro:", err);
      });
  };

  return (
    <div className={`card ${isSelected ? 'selected-card' : ''}`}>
      {/* Checkbox para seleção em massa */}
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
      <div>
        <img className="carro" src={car.image_url_1 || '/default-image.jpg'} alt={car.model} />
      </div>

      {/* Seção de banner para Aluguel e Venda */}
      <div className="banner-container">
        {car.is_for_rent && <span className="banner-item">Aluguel</span>}
        {car.is_for_sale && <span className="banner-item">Venda</span>}
      </div>

      {/* Botão de apagar e de editar */}
      <div className="action-buttons">
        <button className="action-button-delete" onClick={deleteCar}>
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

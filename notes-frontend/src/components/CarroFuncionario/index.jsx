import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

export default function CarroFuncionario({ car, loadCars }) {

  const deleteCar = (event) => {
    event.preventDefault();

    axios
      .delete(`http://localhost:8000/cars/${car.id}/`)
      .then(() => {
        loadCars();  // Recarregar os carros após a exclusão
      })
      .catch((err) => {
        console.error("Erro ao deletar o carro:", err);
      });
  };

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

      {/* Botões de editar e apagar */}
      <div className="action-buttons">
        {/* Botão de apagar */}
        <button className="action-button-delete" onClick={deleteCar}>
          <img className='delete-img' src="/apagar.png" alt="Apagar" />
        </button>

        {/* Botão de editar, utilizando Link para redirecionar */}
        <Link to={`edit/${car.id}`}>
          <button className="action-button-edit">
            <img className='edit-img' src="/editar.png" alt="Editar" />
          </button>
        </Link>
      </div>
    </div>
  );
}

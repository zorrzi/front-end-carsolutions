// components/FormularioVeiculo.jsx

import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function FormularioVeiculo() {
  const [year, setYear] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [isAluguelChecked, setIsAluguelChecked] = useState(false);
  const [isCompraChecked, setIsCompraChecked] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      year: year,
      brand: brand,
      model: model,
      mileage: mileage,
      purchase_price: isCompraChecked ? purchasePrice : null,
      rental_price: isAluguelChecked ? rentalPrice : null,
      image_url_1: imageUrl1,
      image_url_2: imageUrl2,
      image_url_3: imageUrl3,
      is_for_sale: isCompraChecked,
      is_for_rent: isAluguelChecked,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/cars/', carData);

      if (response.status === 201) {
        navigate('/funcionario');
      }
    } catch (error) {
      console.error('Erro ao adicionar o carro:', error);
      alert('Erro ao adicionar o carro.');
    }
  };

  return (
    <div className="container">
      <Link to="/funcionario" className="voltar">
        <span className="seta">←</span> Voltar
      </Link>
      <h1>Adicione os dados do veículo</h1>
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ano">Ano*</label>
          <input
            type="text"
            id="ano"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="marca">Marca*</label>
          <input
            type="text"
            id="marca"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="modelo">Modelo*</label>
          <input
            type="text"
            id="modelo"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="kilometragem">Kilometragem*</label>
          <input
            type="text"
            id="kilometragem"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="preco-compra">Preço de compra*</label>
          <input
            type="text"
            id="preco-compra"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            disabled={!isCompraChecked}
          />
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="compra"
              checked={isCompraChecked}
              onChange={(e) => setIsCompraChecked(e.target.checked)}
            />
            <label htmlFor="compra">Compra</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="preco-aluguel">Preço de aluguel (diária)*</label>
          <input
            type="text"
            id="preco-aluguel"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
            disabled={!isAluguelChecked}
          />
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="aluguel"
              checked={isAluguelChecked}
              onChange={(e) => setIsAluguelChecked(e.target.checked)}
            />
            <label htmlFor="aluguel">Aluguel</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imagem1">URL da imagem principal*</label>
          <input
            type="text"
            id="imagem1"
            value={imageUrl1}
            onChange={(e) => setImageUrl1(e.target.value)}
            required
          />
        </div>

        {imageUrl1 && (
          <div className="form-group">
            <label htmlFor="imagem2">URL da segunda imagem</label>
            <input
              type="text"
              id="imagem2"
              value={imageUrl2}
              onChange={(e) => setImageUrl2(e.target.value)}
            />
          </div>
        )}

        {imageUrl2 && (
          <div className="form-group">
            <label htmlFor="imagem3">URL da terceira imagem</label>
            <input
              type="text"
              id="imagem3"
              value={imageUrl3}
              onChange={(e) => setImageUrl3(e.target.value)}
            />
          </div>
        )}

        <button type="submit" className="botaoAdicionarVeiculo">
          Adicionar veículo
        </button>
      </form>
    </div>
  );
}

export default FormularioVeiculo;

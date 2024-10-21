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
  const [imageUrl, setImageUrl] = useState('');
  const [isAluguelChecked, setIsAluguelChecked] = useState(false);
  const [isCompraChecked, setIsCompraChecked] = useState(false);

  const navigate = useNavigate(); // Hook para redirecionamento

  // Função para habilitar/desabilitar o campo de preço de aluguel
  const handleAluguelCheckboxChange = (e) => {
    setIsAluguelChecked(e.target.checked);
  };

  // Função para habilitar/desabilitar o campo de preço de compra
  const handleCompraCheckboxChange = (e) => {
    setIsCompraChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dados que serão enviados para a API
    const carData = {
      year: year,
      brand: brand,
      model: model,
      mileage: mileage,
      purchase_price: isCompraChecked ? purchasePrice : null, // Se o checkbox estiver marcado, envia o valor
      rental_price: isAluguelChecked ? rentalPrice : null, // Se o checkbox estiver marcado, envia o valor
      image_url: imageUrl,
      is_for_sale: isCompraChecked, // Indica se o carro está à venda
      is_for_rent: isAluguelChecked, // Indica se o carro está para aluguel
    };

    try {
      // Faz a requisição POST para o backend do Django
      const response = await axios.post('http://127.0.0.1:8000/cars/', carData);

      if (response.status === 201) {
        // Redireciona para a página de funcionários após adicionar com sucesso
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
            placeholder="Escolha um ano"
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
            placeholder="Escolha uma marca"
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
            placeholder="Escolha um modelo"
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
            placeholder="Escolha uma kilometragem"
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
            placeholder="Escolha o preço de compra (se aplicável)"
            disabled={!isCompraChecked}
          />
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="compra"
              checked={isCompraChecked}
              onChange={handleCompraCheckboxChange}
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
            placeholder="Escolha o preço de aluguel (se aplicável)"
            disabled={!isAluguelChecked}
          />
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="aluguel"
              checked={isAluguelChecked}
              onChange={handleAluguelCheckboxChange}
            />
            <label htmlFor="aluguel">Aluguel</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="imagem">URL da imagem*</label>
          <input
            type="text"
            id="imagem"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Escolha o URL da imagem"
            required
          />
        </div>

        <button type="submit" className="botaoAdicionarVeiculo">
          Adicionar veículo
        </button>
      </form>
    </div>
  );
}

export default FormularioVeiculo;

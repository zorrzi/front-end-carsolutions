import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function FormularioEdicao() {
  const { id } = useParams();
  const [year, setYear] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [mileage, setMileage] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isAluguelChecked, setIsAluguelChecked] = useState(false);
  const [isCompraChecked, setIsCompraChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/cars/${id}/`)
      .then(response => {
        const car = response.data;
        setYear(car.year);
        setBrand(car.brand);
        setModel(car.model);
        setMileage(car.mileage);
        setPurchasePrice(car.purchase_price || '');
        setRentalPrice(car.rental_price || '');
        setImageUrl(car.image_url || '');
        setIsCompraChecked(car.is_for_sale);
        setIsAluguelChecked(car.is_for_rent);
      })
      .catch(error => {
        console.error('Erro ao buscar o carro:', error);
      });
  }, [id]);

  const handleAluguelCheckboxChange = (e) => {
    setIsAluguelChecked(e.target.checked);
  };

  const handleCompraCheckboxChange = (e) => {
    setIsCompraChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      year: year,
      brand: brand,
      model: model,
      mileage: mileage,
      purchase_price: isCompraChecked ? purchasePrice : null,
      rental_price: isAluguelChecked ? rentalPrice : null,
      image_url: imageUrl,
      is_for_sale: isCompraChecked,
      is_for_rent: isAluguelChecked,
    };

    try {
      // Requisicao PUT para atualizar os dados do veículo
      const response = await axios.put(`http://127.0.0.1:8000/cars/${id}/`, carData);

      if (response.status === 200) {
        navigate('/funcionario');
      }
    } catch (error) {
      console.error('Erro ao editar o carro:', error);
      alert('Erro ao editar o carro.');
    }
  };

  return (
    <div className="container">
      <Link to="/funcionario" className="voltar">
        <span className="seta">←</span> Voltar
      </Link>
      <h1>Edite os dados do veículo</h1>
      
      <form className="form" onSubmit={handleSubmit}>

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
            required
          />
        </div>

        <button type="submit" className="botaoAdicionarVeiculo">
          Editar veículo
        </button>
      </form>
    </div>
  );
}

export default FormularioEdicao;

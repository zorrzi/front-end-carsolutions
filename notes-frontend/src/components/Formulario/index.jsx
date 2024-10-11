import React from "react";
import "./index.css";

export default function Formulario() {
  return (
    <div className="form-container">
      <h2>Busque o carro que deseja:</h2>
      <form className="search-form">
        <div className="form-group">
          <label htmlFor="ano">Ano</label>
          <select id="ano" name="ano">
            <option value="">Escolher</option>
            {/* Adicione mais opções aqui */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="marca">Marca</label>
          <select id="marca" name="marca">
            <option value="">Escolher</option>
            {/* Adicione mais opções aqui */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="modelo">Modelo</label>
          <select id="modelo" name="modelo">
            <option value="">Escolher</option>
            {/* Adicione mais opções aqui */}
          </select>
        </div>

        <button type="submit" className="buscar-btn">
          Buscar
        </button>
      </form>
    </div>
  );
}

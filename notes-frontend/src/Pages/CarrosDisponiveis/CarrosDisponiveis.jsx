import "./CarrosDisponiveis.css";

import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FundoIncial from "../../components/FundoInicial";
import CatalogoCarrosCliente from "../../components/CatalogoCarrosCliente";

function CarrosDisponiveis() {
  return (
    <>
    <Header />
    <FundoIncial />
    <h1 className="destaques">Carros Disponíveis para Aluguel</h1>
    <div className="formulario-aluguel">
    <CatalogoCarrosCliente />
    </div>

    <Footer />
    
    
    </>
  );
}

export default CarrosDisponiveis;
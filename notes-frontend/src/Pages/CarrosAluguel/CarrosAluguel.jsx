import "./CarrosAluguel.css";

import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FundoIncial from "../../components/FundoInicial";
import CatalogoAluguelCliente from "../../components/CatalogoAluguelCliente";

function CarrosAluguel() {
  return (
    <>
    <Header />
    <FundoIncial />
    <h1 className="destaques">Carros Disponíveis para Aluguel</h1>
    <CatalogoAluguelCliente />

    <Footer />
    
    
    </>
  );
}

export default CarrosAluguel;
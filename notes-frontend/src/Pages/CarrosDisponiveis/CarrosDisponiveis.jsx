import "./CarrosDisponiveis.css";

import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FundoIncial from "../../components/FundoInicial";
import CatalogoCarrosCliente from "../../components/CatalogoCarrosCliente";
import BotaoVoltar from "../../components/BotaoVoltar";

function CarrosDisponiveis() {
  return (
    <>
    <Header />
    <FundoIncial />
    <BotaoVoltar />
    <h1 className="destaques">Carros Disponíveis</h1>
    <div className="formulario-aluguel">
    <CatalogoCarrosCliente />
    </div>

    <Footer />
    
    
    </>
  );
}

export default CarrosDisponiveis;
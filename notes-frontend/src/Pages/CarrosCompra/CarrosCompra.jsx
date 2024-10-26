import "./CarrosCompra.css";

import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FundoIncial from "../../components/FundoInicial";
import CatalogoCompraCliente from "../../components/CatalogoCompraCliente";

function CarrosCompra() {
  return (
    <>
    <Header />
    <FundoIncial />
    <h1 className="destaques">Carros Disponíveis para Compra</h1>
    <CatalogoCompraCliente />

    <Footer />
    
    
    </>
  );
}

export default CarrosCompra;
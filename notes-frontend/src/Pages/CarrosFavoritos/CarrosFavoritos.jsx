import "./CarrosFavoritos.css";

import React from 'react';
import CatalogoCarrosFavoritos from "../../components/CatalogoCarrosFavoritos";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FundoIncial from "../../components/FundoInicial";

function CarrosFavoritos() {
  return (
    <>
    <Header />
    <FundoIncial />
    <h1 className="destaques">Carros Favoritos</h1>
    <CatalogoCarrosFavoritos />
    <Footer />
    
    
    </>
  );
}

export default CarrosFavoritos;
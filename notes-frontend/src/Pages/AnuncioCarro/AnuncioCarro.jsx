import React from 'react';
import './AnuncioCarro.css';
import InformacoesCarro from '../../components/InformacoesCarro';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FichaTecnica from '../../components/FichaTecnica';
import BotaoVoltar from '../../components/BotaoVoltar';


function AnuncioCarro() {
  return (
    <>
    
    <Header />
    
    <BotaoVoltar />


    <InformacoesCarro />
    
    <FichaTecnica />

    <Footer />

    
    </>
    

  );
}

export default AnuncioCarro;
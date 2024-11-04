import React, { useRef } from 'react';
import './AnuncioCarro.css';
import InformacoesCarro from '../../components/InformacoesCarro';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FichaTecnica from '../../components/FichaTecnica';
import BotaoVoltar from '../../components/BotaoVoltar';
import CarrosSimilares from '../../components/CarrosSimilares';
import { useParams } from 'react-router-dom';

function AnuncioCarro() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <BotaoVoltar />

      <InformacoesCarro />
      


      <FichaTecnica />

      <CarrosSimilares carId={id} />

      <Footer />
    </>
  );
}

export default AnuncioCarro;

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
  const carrosSimilaresRef = useRef(null);

  const handleScrollToSimilares = () => {
    carrosSimilaresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <BotaoVoltar />
      <button className="botao-similares" onClick={handleScrollToSimilares}>
        Anúncios Similares
      </button>

      <InformacoesCarro />
      


      <FichaTecnica />

      <div ref={carrosSimilaresRef}>
        <CarrosSimilares carId={id} />
      </div>

      <Footer />
    </>
  );
}

export default AnuncioCarro;

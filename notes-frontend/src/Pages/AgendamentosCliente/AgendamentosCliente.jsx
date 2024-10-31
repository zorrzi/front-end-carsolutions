import React from 'react';
import './AgendamentosCliente.css';
import AgendaCliente from '../../components/AgendaCliente';
import Header from '../../components/Header';
import BotaoVoltar from '../../components/BotaoVoltar';
import Footer from '../../components/Footer';
import FormularioFeedback from '../../components/FormularioFeedback';

function AgendamentoCliente() {
  return ( 
    <>
    <Header />
    <BotaoVoltar />
    <AgendaCliente />
    
    <Footer />
    
    </>
  );
}

export default AgendamentoCliente;
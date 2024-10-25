import React from 'react';
import './AgendamentosFuncionario.css';

import ListaAtendimentoFuncionario from '../../components/ListaAtendimentoFuncionario';
import HeaderFuncionario from '../../components/HeaderFuncionario';
import BotaoVoltar from '../../components/BotaoVoltar';


function AgendamentosFuncionario() {
    return (
      <>
        <HeaderFuncionario />
        <BotaoVoltar />
        <ListaAtendimentoFuncionario />

        
      
      </>
      
  
    );
  }
  
  export default AgendamentosFuncionario;
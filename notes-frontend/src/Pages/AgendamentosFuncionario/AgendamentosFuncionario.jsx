import React from 'react';
import './AgendamentosFuncionario.css';

import ListaAtendimentoFuncionario from '../../components/ListaAtendimentoFuncionario';
import HeaderFuncionario from '../../components/HeaderFuncionario';
import BotaoVoltar from '../../components/BotaoVoltar';
import ChatFuncionario from '../../components/ChatFuncionario';


function AgendamentosFuncionario() {
    return (
      <>
        <HeaderFuncionario />
        <BotaoVoltar />
        <ListaAtendimentoFuncionario />
        <ChatFuncionario />

        
      
      </>
      
  
    );
  }
  
  export default AgendamentosFuncionario;
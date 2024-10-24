import React from 'react';
import './FuncionarioInicial.css';

import HeaderFuncionario from '../../components/HeaderFuncionario';
import BotaoAdicionar from '../../components/BotaoAdicionar';
import CatalogoCarrosFuncionario from '../../components/CatalogoCarrosFuncionario';
import AgendaFuncionario from '../../components/AgendaFuncionario';

function FuncionarioInicial() {
    return (
      <>
        <HeaderFuncionario />
        <div className="carros-container">
          <CatalogoCarrosFuncionario />
          <AgendaFuncionario />
        </div>
        


        

        

        <BotaoAdicionar className="botao-add"/>


      

        
      
      </>
      
  
    );
  }
  
  export default FuncionarioInicial;
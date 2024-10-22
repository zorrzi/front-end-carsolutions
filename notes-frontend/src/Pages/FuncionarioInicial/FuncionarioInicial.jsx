import React from 'react';
import './FuncionarioInicial.css';

import HeaderFuncionario from '../../components/HeaderFuncionario';
import BotaoAdicionar from '../../components/BotaoAdicionar';
import CatalogoCarrosFuncionario from '../../components/CatalogoCarrosFuncionario';

function FuncionarioInicial() {
    return (
      <>
        <HeaderFuncionario />
        <div className="carros-container">
        <CatalogoCarrosFuncionario />
        </div>

        

        

        <BotaoAdicionar />


      

        
      
      </>
      
  
    );
  }
  
  export default FuncionarioInicial;
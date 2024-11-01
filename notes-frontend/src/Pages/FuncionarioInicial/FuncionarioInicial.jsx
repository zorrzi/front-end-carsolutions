import React from 'react';
import './FuncionarioInicial.css';

import HeaderFuncionario from '../../components/HeaderFuncionario';
import BotaoAdicionar from '../../components/BotaoAdicionar';
import CatalogoCarrosFuncionario from '../../components/CatalogoCarrosFuncionario';
import AgendaFuncionario from '../../components/AgendaFuncionario';
import CatalogoFeedbacks from '../../components/CatalogoFeedbacks';

function FuncionarioInicial() {
    return (
      <>
        <HeaderFuncionario />
        <h1 className='destaques'>Visão Geral</h1>
        <div className="carros-container">
          <CatalogoCarrosFuncionario className='carros-catalogo-func' />
          <div className='agenda-feedback'>
            <AgendaFuncionario />
            <CatalogoFeedbacks />
          </div>
        </div>


        

        

        <BotaoAdicionar className="botao-add"/>


      

        
      
      </>
      
  
    );
  }
  
  export default FuncionarioInicial;
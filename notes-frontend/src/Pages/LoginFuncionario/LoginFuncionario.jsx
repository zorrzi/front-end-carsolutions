import React from 'react';
import './LoginFuncionario.css';

import Header from '../../components/Header';
import FundoLoginFuncionario from "../../components/FundoLoginFuncionario";
import LoginFuncionario from '../../components/LoginFuncionario';

function loginFuncionario() {
    return (
      <>
      <Header/>

      <div className="image-container">
        <FundoLoginFuncionario />
        <LoginFuncionario />
        
      </div>
        
      
      </>
      
  
    );
  }
  
  export default loginFuncionario;
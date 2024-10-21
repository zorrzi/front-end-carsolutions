import React from 'react';
import './LoginCliente.css';

import LoginCliente from '../../components/LoginCliente';
import Header from "../../components/Header";
import FundoLoginCliente from "../../components/FundoLoginCliente";
import Footer from "../../components/Footer";

function loginCliente() {
    return (
      <>
      <Header />

      <div className="image-container">
        <FundoLoginCliente />
        <LoginCliente />
      </div>
      <div className="espaco">
        <Footer />
      </div>
        
      
      </>
      
  
    );
  }
  
  export default loginCliente;
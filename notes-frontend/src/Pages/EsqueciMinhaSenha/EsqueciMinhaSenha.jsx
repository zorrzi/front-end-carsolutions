import React from 'react';
import './EsqueciMinhaSenha.css';

import Header from "../../components/Header";
import FundoLoginCliente from "../../components/FundoLoginCliente";
import Footer from "../../components/Footer";
import FormularioEsqueciMinhaSenha from '../../components/FormularioEsqueciMinhaSenha';

function EsqueciMinhaSenha() {
    return (
      <>
      <Header />

      <div className="image-container">
        <FundoLoginCliente />
        <FormularioEsqueciMinhaSenha />
      </div>
      <div className="espaco">
        <Footer />
      </div>
        
      
      </>
      
  
    );
  }
  
  export default EsqueciMinhaSenha;
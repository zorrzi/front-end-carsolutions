import React, { useState } from "react";
import axios from "axios";
import "./RedefinirSenha.css";
import FormularioRedefinirSenha from "../../components/FormularioRedefinirSenha";
import Header from "../../components/Header";
import FundoLoginCliente from "../../components/FundoLoginCliente";


function RedefinirSenha() {
    return (
      <>

      <Header />
      <FundoLoginCliente />
      <FormularioRedefinirSenha />

        

      

        
      
      </>
      
  
    );
  }
  
  export default RedefinirSenha;
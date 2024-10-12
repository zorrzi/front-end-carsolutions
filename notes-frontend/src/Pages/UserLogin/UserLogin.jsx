import React from 'react';
import './userLogin.css';

import LoginCliente from '../../components/LoginCliente';
import Header from "../../components/Header";
import FundoLogin from "../../components/FundoLogin";
import Footer from "../../components/Footer";

function userLogin() {
    return (
      <>
      <Header />

      <div className="image-container">
        <FundoLogin />
        <LoginCliente />
      </div>
      <div className="espaco">
        <Footer />
      </div>
        
      
      </>
      
  
    );
  }
  
  export default userLogin;
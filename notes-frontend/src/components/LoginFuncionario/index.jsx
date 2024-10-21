import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import "./index.css";

export default function LoginFuncionario() {

  return (
    <div className="login-container">
      <h1>Bem vindo(a)!</h1>
      <form className="login-form">
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Entrar
        </button>

      </form>
    </div>
  );
}

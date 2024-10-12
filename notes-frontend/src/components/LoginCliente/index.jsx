import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default function LoginCliente() {
  return (
    <div className="login-container">
      <h1>Digite o seu e-mail e senha</h1>
      <form className="login-form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Senha"
            required
          />
        </div>

        <a href="#" className="forgot-password">
          Esqueci minha senha
        </a>

        <button type="submit" className="login-btn">
          Entrar
        </button>

        <div className="signup-link">
            <p>Não tem uma conta?</p>
            <Link to={"/userSignup"}>Crie a sua</Link>
        </div>
      </form>
    </div>
  );
}

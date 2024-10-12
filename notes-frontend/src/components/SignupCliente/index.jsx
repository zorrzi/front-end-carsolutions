import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default function SignupCliente() {
  return (
    <div className="register-container">
      <h1>Crie uma conta com o seu e-mail</h1>
      <form className="register-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome completo"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Confirmar email"
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

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirmar senha"
            required
          />
        </div>

        <button type="submit" className="register-btn">
          Cadastre-se
        </button>

        <div className="signup-link">
            <p>Já tem uma conta?</p>
            <Link to={"/userLogin"}>Entrar</Link>
        </div>
      </form>
    </div>
  );
}

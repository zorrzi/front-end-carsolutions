import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

export default function SignupCliente() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    cpf: "",
    senha: "",
    confirmar_senha: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/cadastro/", formData);
      setMessage("Cadastro realizado com sucesso!");
    } catch (error) {
      setMessage("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="register-container">
      <h1>Crie uma conta com o seu username</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmar_senha"
            placeholder="Confirmar senha"
            value={formData.confirmar_senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="register-btn">
          Cadastre-se
        </button>

        <div className="signup-link">
          <p>Já tem uma conta?</p>
          <Link to={"/loginCliente"}>Entrar</Link>
        </div>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function SignupCliente() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    cpf: "",
    cnh: "",  // Novo campo para CNH
    senha: "",
    confirmar_senha: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCPF = (cpf) => {
    return cpf.length === 11 && /^[0-9]+$/.test(cpf);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCPF(formData.cpf)) {
      setMessage("CPF inválido! O CPF deve ter 11 dígitos.");
      return;
    }

    if (formData.senha !== formData.confirmar_senha) {
      setMessage("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/cadastro/`, {
        username: formData.username,
        email: formData.email,
        cpf: formData.cpf,
        cnh: formData.cnh,  // Inclui o campo CNH na requisição
        senha: formData.senha,
        confirmar_senha: formData.confirmar_senha
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", formData.username);
      setMessage("Cadastro realizado com sucesso!");
      navigate("/"); // Redireciona para a página principal
    } catch (error) {
      setMessage(error.response?.data.message || "Erro ao cadastrar. Verifique os dados e tente novamente.");
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
            placeholder="Nome de usuário"
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
            type="text"
            name="cnh"
            placeholder="CNH"
            value={formData.cnh}
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

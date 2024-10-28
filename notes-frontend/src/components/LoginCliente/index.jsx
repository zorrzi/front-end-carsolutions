import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 
import "./index.css";

export default function LoginCliente() {
  const [formData, setFormData] = useState({
    username: "",
    senha: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Faz a requisição para a API de login
      const response = await axios.post("http://localhost:8000/login/", {
        username: formData.username,
        password: formData.senha, // Ajuste de nome para 'password' no payload da requisição
      });

      // Armazena o token no localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", formData.username); // Preserva o nome do usuário no localStorage
      setMessage("Login realizado com sucesso!");
      navigate('/'); // Redireciona para a página principal
    } catch (error) {
      setMessage(error.response?.data.message || "Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <h1>Bem-vindo(a)!</h1>
      <form className="login-form" onSubmit={handleSubmit}>
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
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Entrar
        </button>

        <div className="forgot-password">
          <Link to={"/esqueciMinhaSenha"}>Esqueci minha senha</Link>
        </div>

        <div className="signup-link">
          <p>Não tem uma conta?</p>
          <Link to={"/signupCliente"}>Crie a sua</Link>
        </div>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

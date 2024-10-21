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
      const response = await axios.post("http://localhost:8000/login/", formData);
      localStorage.setItem('username', formData.username);
      setMessage("Login realizado com sucesso!");
      navigate('/');
    } catch (error) {
      console.error(error.response.data);
      setMessage("Erro ao fazer login. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <h1>Bem vindo(a)!</h1>
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

        <div className="signup-link">
          <p>Não tem uma conta?</p>
          <Link to={"/signupCliente"}>Crie a sua</Link>
        </div>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

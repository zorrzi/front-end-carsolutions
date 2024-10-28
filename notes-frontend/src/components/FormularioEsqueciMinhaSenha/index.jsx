import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "./index.css";

export default function EsqueciMinhaSenha() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Faz a requisição para a API de esqueci a senha
      const response = await axios.post("http://localhost:8000/solicitar-redefinicao-senha/", {
        email: email,
      });

      setMessage(response.data.message || "E-mail de redefinição de senha enviado!");
    } catch (error) {
      setMessage(error.response?.data.error || "Erro ao solicitar redefinição. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <h1>Esqueci minha senha</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Enviar
        </button>

        <div className="back-to-login">
          <Link to={"/loginCliente"}>Voltar para o login</Link>
        </div>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

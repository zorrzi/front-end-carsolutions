import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function LoginFuncionario() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagem de erro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiBaseUrl}/loginFuncionario/`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("isFuncionario", "true");
        navigate("/funcionario");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Nome de usuário ou senha inválidos.");
      } else if (error.response && error.response.status === 403) {
        setErrorMessage("Usuário não tem permissão.");
      } else {
        console.error("Erro ao realizar login:", error);
        setErrorMessage("Erro no servidor. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="login-container-func">
      <h1>Bem-vindo(a)!</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Entrar
        </button>

        {/* Exibe a mensagem de erro, se houver */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

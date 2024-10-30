import React, { useState } from "react";
import axios from "axios";  // Importa o axios personalizado
import { useNavigate } from "react-router-dom";
import "./index.css";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function LoginFuncionario() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Usando o axios personalizado para enviar a requisição de login
      const response = await axios.post(`${apiBaseUrl}/loginFuncionario/`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Armazena o token e a flag de funcionário no localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("isFuncionario", "true");
        navigate("/funcionario");  // Redireciona para a página do funcionário
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Nome de usuário ou senha inválidos.");
      } else if (error.response && error.response.status === 403) {
        alert("Usuário não tem permissão.");
      } else {
        console.error("Erro ao realizar login:", error);
        alert("Erro no servidor. Tente novamente mais tarde.");
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
      </form>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./index.css";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function FormularioRedefinirSenha() {
  const { uid, token } = useParams(); // Captura uid e token da URL
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post(`${apiBaseUrl}/redefinir-senha/${uid}/${token}/`, {
        nova_senha: novaSenha,
        confirmar_senha: confirmarSenha,
      });
      setMessage(response.data.message || "Senha redefinida com sucesso!");
      setError("");
      
      // Redireciona para a página de login após 3 segundos
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data.error || "Erro ao redefinir a senha.");
    }
  };

  return (
    <div className="login-container-redefinir">
      <h1>Redefinir senha</h1>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            name="novaSenha"
            placeholder="Digite sua nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirme sua nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Redefinir
        </button>
      </form>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../utils/axiosConfig';  // Importa o axios personalizado
import "./index.css";

export default function HeaderFuncionario() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // Carregar o nome do funcionário do localStorage quando o header for montado
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const isFuncionario = localStorage.getItem("isFuncionario");

    // Verifica se o usuário logado é funcionário
    if (storedUsername && isFuncionario === "true") {
      setUsername(storedUsername);
    }
  }, []);

  // Função para fazer logout e limpar o localStorage
  const handleLogout = async () => {
    try {
      // Requisição para o backend para realizar o logout usando o axios personalizado
      const response = await axios.post("http://localhost:8000/logoutFuncionario/", {});
      
      if (response.status === 200) {
        // Limpa o localStorage
        localStorage.removeItem("username");  // Remove o nome do funcionário do localStorage
        localStorage.removeItem("isFuncionario");  // Remove a flag de funcionário
        setUsername(null);  // Limpa o estado do nome do funcionário
        navigate("/");  // Redireciona para a página inicial
      }
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  return (
    <div className="header-funcionario">
      <img className="logo" src="/logo.png" alt="Logo Car Solutions" />

      {/* Opções do menu de funcionário */}
      <div className="menu-funcionario">
        <Link to="/funcionario" className="menu-item">
          <img className="menu-icon" src="/funcionario.png" alt="Funcionário" />
          <span>{username ? username : "Funcionário"}</span>
        </Link>

        <Link to="/atendimentoFuncionario" className="menu-item">
          <img className="menu-icon" src="/atendimento.png" alt="Atendimento" />
          <span>Atendimento</span>
        </Link>

        <button onClick={handleLogout} className="menu-item-logout-btn">
          <img className="menu-icon" src="/sair.png" alt="Sair" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}

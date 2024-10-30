import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from '../../utils/axiosConfig';
import "./index.css";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function HeaderFuncionario() {
  const [username, setUsername] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar a visibilidade do menu
  const navigate = useNavigate();

  // Carregar o nome do funcionário do localStorage quando o header for montado
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const isFuncionario = localStorage.getItem("isFuncionario");

    if (storedUsername && isFuncionario === "true") {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const response = await axios.post(`${apiBaseUrl}/logoutFuncionario/`, {}, config);
      
      if (response.status === 200) {
        localStorage.removeItem("username");
        localStorage.removeItem("isFuncionario");
        localStorage.removeItem("token");
        setUsername(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  // Função para alternar a visibilidade do menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="header-funcionario">
      <img className="logo-func" src="/logo.png" alt="Logo Car Solutions" />

      {/* Ícone para abrir o menu em telas menores */}
      <img
        className="menu-toggle-icon"
        src="/menu-aberto.png"
        alt="Abrir menu"
        onClick={toggleMenu}
      />

      {/* Menu do funcionário, visível apenas se showMenu for true em telas menores */}
      <div className={`menu-funcionario ${showMenu ? "show" : ""}`}>
        <Link to="/funcionario" className="menu-item-func">
          <img className="menu-icon-func" src="/funcionario.png" alt="Funcionário" />
          <span className="span-func">{username ? username : "Funcionário"}</span>
        </Link>
        <p className="divisoria">|</p>
        <Link to="/agendamentosFuncionario" className="menu-item-func">
          <img className="menu-icon-func" src="/atendimento.png" alt="Atendimento" />
          <span className="span-func">Atendimento</span>
        </Link>

        <p className="divisoria">|</p>

        <button onClick={handleLogout} className="menu-item-logout-btn-func">
          <img className="menu-icon-func" src="/sair.png" alt="Sair" />
          <span className="span-func">Sair</span>
        </button>
      </div>
    </div>
  );
}

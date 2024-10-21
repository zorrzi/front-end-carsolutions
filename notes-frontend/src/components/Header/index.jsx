import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";

export default function Header() {
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginChoice, setShowLoginChoice] = useState(false);  // Estado para exibir o card de escolha
  const navigate = useNavigate();

  // Verifica se o usuário está logado
  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  // Função de logout e limpeza do localStorage
  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null); // Limpa o estado local
    setShowDropdown(false); // Fecha o dropdown
  };

  // Alterna o dropdown para o perfil do usuário
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Função para exibir o card de escolha de login (cliente ou funcionário)
  const handleLoginClick = () => {
    setShowLoginChoice(!showLoginChoice); // Alterna o card de escolha de login
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src="/logo.png" alt="Logo" />
      </Link>
      <div className="info">
        <span>Aluguel</span>
        <span>Vendas</span>
        <span>Sobre nós</span>

        <div className="user">
          {username ? (
            <>
              <span className="user-name" onClick={toggleDropdown}>
                {username}
              </span>
              <div className="alinhamento">
                {showDropdown && (
                  <div className="dropdown">
                    <Link to="/favoritos" className="favoritos-overlay">
                      <img className="favorites" src="/favorito.png" alt="Favoritos" />
                      <span>Favoritos</span>
                    </Link>

                    <Link to="/agenda" className="agenda-overlay">
                      <img className="agenda" src="/agenda.png" alt="Agenda" />
                      <span>Agenda</span>
                    </Link>
                    <button onClick={handleLogout}>Sair</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <span onClick={handleLoginClick} className="entrar-btn">
              Entrar
            </span> // Mostra o card de escolha ao clicar
          )}
          <img className="favorites" src="/user.png" alt="Usuário" />
        </div>

        {/* Card de escolha entre cliente e funcionário */}
        {showLoginChoice && (
          <div className="login-choice-card">
            <Link to="/loginCliente" className="login-overlay">
              <img className="favorites" src="/usuario-login.png" alt="Login Cliente" />
              <span>Cliente</span>
            </Link>
            <Link to="/loginFuncionario" className="login-overlay">
              <img className="favorites" src="/funcionario.png" alt="Login Funcionário" />
              <span>Funcionário</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

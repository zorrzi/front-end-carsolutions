import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./index.css";
import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; 

export default function Header() {
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginChoice, setShowLoginChoice] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const loginButtonRef = useRef(null); // Referência para o botão "Entrar"
  const loginChoiceRef = useRef(null); // Referência para o card de escolha de login

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Usuário não está autenticado.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    axios
      .post(`${apiBaseUrl}/logout/`, {}, config)
      .then((response) => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUsername(null);
        setShowDropdown(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error.response?.data || error.message);
      });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLoginClick = () => {
    setShowLoginChoice(!showLoginChoice);
  };

  useEffect(() => {
    const adjustPosition = () => {
      if (showLoginChoice && loginButtonRef.current && loginChoiceRef.current) {
        const buttonRect = loginButtonRef.current.getBoundingClientRect();
        const scrollOffset = window.scrollY;

        loginChoiceRef.current.style.top = `${buttonRect.bottom + scrollOffset + 8}px`;
        loginChoiceRef.current.style.left = `${buttonRect.left}px`;
      }
    };

    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => window.removeEventListener("resize", adjustPosition);
  }, [showLoginChoice]);

  return (
    <div className="header">
      <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
        <img className="menu-icon" src="/menu-aberto.png" alt="Menu" />
      </div>
      <Link to="/">
        <img className="logo" src="/logo.png" alt="Logo" />
      </Link>
      <div className={`info ${showMenu ? "show" : ""}`}>
        <Link className="link" to="/carrosDisponiveis">
          <span className="nav-disp">Carros Disponíveis</span>
        </Link>
        <p className="divisoria">|</p>
        <Link className="link" to="/sobreNos">
          <span className="nav">Sobre nós</span>
        </Link>
        <p className="divisoria">|</p>
        <div className="user">
          {username ? (
            <>
              <span className="user-name" onClick={toggleDropdown}>
                {username}
              </span>
              {showDropdown && (
                <div className="dropdown">
                  <Link to="/carrosFavoritos" className="favoritos-overlay">
                    <img className="favorites" src="/favorito.png" alt="Favoritos" />
                    <span>Favoritos</span>
                  </Link>
                  <Link to="/agendamentoCliente" className="agenda-overlay">
                    <img className="agenda" src="/agenda.png" alt="Agenda" />
                    <span>Agenda</span>
                  </Link>
                  <div className="Sair">
                    <img className="sair-img" src="/sair.png" alt="Sair" />
                    <button onClick={handleLogout}>Sair</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <span
              onClick={handleLoginClick}
              className="entrar-btn"
              ref={loginButtonRef} // Referência para o botão "Entrar"
            >
              Entrar
            </span>
          )}
          <img className="perfil" src="/user.png" alt="Usuário" />
        </div>
      </div>

      {showLoginChoice && (
        <div ref={loginChoiceRef} className="login-choice-card">
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
  );
}

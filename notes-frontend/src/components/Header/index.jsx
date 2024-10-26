import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./index.css";
import axios from "axios";

export default function Header() {
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginChoice, setShowLoginChoice] = useState(false);  // Estado para exibir o card de escolha
  const navigate = useNavigate();
  
  const loginButtonRef = useRef(null); // Referência para o botão "Entrar"
  const loginChoiceRef = useRef(null); // Referência para o card de escolha de login

  // Verifica se o usuário está logado
  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    console.log(token);
    
    if (!token) {
      console.error("Usuário não está autenticado.");
      return;
    }

    // Configura o header com o token de autenticação
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    console.log(config);
    axios.post('http://localhost:8000/logout/', {}, config)
      .then(response => {
        console.log(response.data.message); // Mensagem de sucesso do logout
        localStorage.removeItem('username'); // Limpa o localStorage
        localStorage.removeItem('token'); // Remove o token de autenticação
        setUsername(null); // Limpa o estado local
        setShowDropdown(false); // Fecha o dropdown
        navigate('/');
      })
      .catch(error => {
        console.error('Erro ao fazer logout:', error.response?.data || error.message);
      });
  };

  // Alterna o dropdown para o perfil do usuário
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Função para exibir o card de escolha de login (cliente ou funcionário)
  const handleLoginClick = () => {
    setShowLoginChoice(!showLoginChoice); // Alterna o card de escolha de login
  };

  // Reposiciona o card de escolha de login quando necessário
  useEffect(() => {
    const adjustPosition = () => {
      if (showLoginChoice && loginButtonRef.current && loginChoiceRef.current) {
        const buttonRect = loginButtonRef.current.getBoundingClientRect();
        const scrollOffset = window.scrollY;

        if (window.innerWidth <= 768) {
          // Para telas menores, centralizar
          loginChoiceRef.current.style.top = `${buttonRect.bottom + scrollOffset + 10}px`;
          loginChoiceRef.current.style.left = `50%`;
          loginChoiceRef.current.style.transform = `translateX(-50%)`; // Centraliza o card
        } else {
          // Para telas maiores, ajuste normal
          loginChoiceRef.current.style.top = `${buttonRect.bottom + scrollOffset + 10}px`;
          loginChoiceRef.current.style.left = `${buttonRect.left - 20}px`; // Ajuste de 20px para a esquerda
          loginChoiceRef.current.style.transform = `none`; // Remove a centralização
        }
      }
    };

    adjustPosition(); // Chama ao abrir
    window.addEventListener('resize', adjustPosition); // Adiciona um listener para redimensionar

    return () => window.removeEventListener('resize', adjustPosition); // Remove o listener ao desmontar
  }, [showLoginChoice]);

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src="/logo.png" alt="Logo" />
      </Link>
      <div className="info">
        <Link to="/carrosAluguel">
        <span className="nav">Aluguel</span>
        </Link>
        <Link to="/carrosCompra">
        <span className="nav">Compra</span>
        </Link>
        <Link to="/sobreNos">
        <span className="nav">Sobre nós</span>
        </Link>

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
                      <img className="sair-img" src="/sair.png" alt="Sair " />
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
            </span> // Mostra o card de escolha ao clicar
          )}
          <img className="perfil" src="/user.png" alt="Usuário" />
        </div>

        {/* Card de escolha entre cliente e funcionário */}
        {showLoginChoice && (
          <div 
            ref={loginChoiceRef} // Referência para o card de escolha de login
            className="login-choice-card"
          >
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

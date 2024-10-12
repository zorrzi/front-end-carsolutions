import { Link } from "react-router-dom";
import "./index.css";

export default function Header() {
    return (
      <div className="header">
        <Link to="/"> 
        <img className="logo" src="/logo.png" alt="Logo" />
        </Link>
        <div className="info">
          <span>Aluguel</span>
          <span>Vendas</span>
          <span>Sobre nós</span>
          <div className='user'>
            <Link to="/userLogin">    
            <span>Entrar</span>
            </Link>
            <img className='favorites' src="/user.png" alt="Usuário" />
            
          </div>
          <img className='favorites' src="/favorito.png" alt="Favorites" />

        </div>


      </div>
    )
  }
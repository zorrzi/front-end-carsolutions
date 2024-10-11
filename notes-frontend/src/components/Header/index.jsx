import "./index.css";

export default function Header() {
    return (
      <div className="header">
        <img className="logo" src="/logo.png" alt="Logo" />
        <div className="info">
          <span>Aluguel</span>
          <span>Vendas</span>
          <span>Sobre nós</span>
          <div className='user'>
            <span>Entrar</span>
            <img className='favorites' src="/user.png" alt="Usuário" />
          </div>
          <img className='favorites' src="/favorito.png" alt="Favorites" />

        </div>


      </div>
    )
  }
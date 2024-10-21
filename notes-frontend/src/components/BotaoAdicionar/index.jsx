import { Link } from "react-router-dom";
import "./index.css";

export default function BotaoAdicionar() {
    return (
        <div className="botaoAdicionarContainer">
            <Link to="/adicionarVeiculo"> 
            <button className="botaoAdicionar">+</button>
            </Link>
        </div>
    );
  }
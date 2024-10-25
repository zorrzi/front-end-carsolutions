import { Link } from "react-router-dom";
import "./index.css";

export default function BotaoAdicionar() {
    return (
        <div className="botaoChatContainer">
            <button className="botao-chat">
                <img className="icon-chat" src="/bater-papo.png" alt="Chat" />
            </button>
        </div>
    );
  }
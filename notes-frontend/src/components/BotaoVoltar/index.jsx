import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import './index.css'; // Importa o arquivo de estilos

export default function BotaoVoltar() {
    const navigate = useNavigate(); // Inicializa o hook para navegação

    // Função para voltar para a página anterior
    const voltarPagina = () => {
        console.log('Voltando para a página anterior...'); // Exibe uma mensagem no console
        navigate(-1); // Navega de volta para a página anterior
    };

    return (
        <div 
        className='botao-voltar'
        onClick={voltarPagina} >
            {/* Imagem que leva o usuário para a página anterior */}
            <img
                src={'/de-volta.png'} // Caminho da imagem
                alt="Voltar"
                // Chama a função para voltar
                className='imagem-voltar' // Estilo da imagem
            />
            <p className='texto-voltar'>
                {/* Texto que descreve a ação do botão */}
                Voltar
            </p>
        </div>
    );
}

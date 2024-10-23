import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

export default function BotaoFavoritos() {
  return (
    <div>
        <button className='botao-favoritos'>
            <span className="texto-favoritos">Adicionar aos Favoritos</span>
            <img className='icone-favoritos' src='/favorito.png' alt='Adicionar aos Favoritos' />
        </button>
    </div>
  );
}
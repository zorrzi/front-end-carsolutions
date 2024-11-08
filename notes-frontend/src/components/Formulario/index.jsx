import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Usar useNavigate para redirecionar
import './index.css';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Formulario() {
    const [anos, setAnos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);

    const [anoSelecionado, setAnoSelecionado] = useState('');
    const [marcaSelecionada, setMarcaSelecionada] = useState('');
    const [modeloSelecionado, setModeloSelecionado] = useState('');

    const navigate = useNavigate();  // Usar useNavigate para redirecionar

    // Carregar todos os anos ao montar o componente
    useEffect(() => {
        axios.get(`${apiBaseUrl}/cars/years/`)
            .then(response => setAnos(response.data))
            .catch(error => console.error('Erro ao buscar anos:', error));
    }, []);

    // Carregar as marcas quando o ano é selecionado
    useEffect(() => {
            axios.get(`${apiBaseUrl}/cars/brands/`)
            .then(response => setMarcas(response.data))
            .catch(error => console.error('Erro ao buscar marcas:', error));
    }, [anoSelecionado]);

    // Carregar os modelos quando a marca é selecionada
    useEffect(() => {
        if (anoSelecionado && marcaSelecionada) {
            axios.get(`${apiBaseUrl}/cars/models/${anoSelecionado}/${marcaSelecionada}/`)
                .then(response => setModelos(response.data))
                .catch(error => console.error('Erro ao buscar modelos:', error));
        }
    }, [marcaSelecionada, anoSelecionado]);

    // Função de busca quando o formulário é enviado
    const buscarCarro = (event) => {
        event.preventDefault();

        // Monta a URL com base nos parâmetros selecionados
        let url = '/carrosDisponiveis';
        if (anoSelecionado && marcaSelecionada && modeloSelecionado) {
            url = `/carrosDisponiveis?ano=${anoSelecionado}&marca=${marcaSelecionada}&modelo=${modeloSelecionado}`;
        } else if (anoSelecionado && marcaSelecionada) {
            url = `/carrosDisponiveis?ano=${anoSelecionado}&marca=${marcaSelecionada}`;
        } else if (anoSelecionado) {
            url = `/carrosDisponiveis?ano=${anoSelecionado}`;
        }

        // Redireciona para a página de resultados com os parâmetros
        navigate(url);
    };

    return (
        <div className="form-container">
            <h2>Busque o carro que deseja:</h2>
            <form className="search-form" onSubmit={buscarCarro}>
                {/* Campo de Ano */}
                <div className="form-group">
                    <label htmlFor="ano">Ano</label>
                    <select
                        id="ano"
                        value={anoSelecionado}
                        onChange={(e) => setAnoSelecionado(e.target.value)}
                    >
                        <option value="">Escolher</option>
                        {anos.map((ano) => (
                            <option key={ano} value={ano}>
                                {ano}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo de Marca */}
                <div className="form-group">
                    <label htmlFor="marca">Marca</label>
                    <select
                        id="marca"
                        value={marcaSelecionada}
                        onChange={(e) => setMarcaSelecionada(e.target.value)}
                    >
                        <option value="">Escolher</option>
                        {marcas.map((marca) => (
                            <option key={marca} value={marca}>
                                {marca}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo de Modelo */}
                <div className="form-group">
                    <label htmlFor="modelo">Modelo</label>
                    <select
                        id="modelo"
                        value={modeloSelecionado}
                        onChange={(e) => setModeloSelecionado(e.target.value)}
                        disabled={!marcaSelecionada} 
                    >
                        <option value="">Escolher</option>
                        {modelos.map((modelo) => (
                            <option key={modelo} value={modelo}>
                                {modelo}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="buscar-btn">Buscar</button>
            </form>
        </div>
    );
}

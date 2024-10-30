import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import CarroCliente from '../../components/CarroCliente';
import Header from '../../components/Header';
import FundoInicial from '../../components/FundoInicial';
import Footer from '../../components/Footer';
import './ResultadoBusca.css';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; 


export default function ResultadoBusca() {
    const [carros, setCarros] = useState([]);

    // Pega os parâmetros da URL (ano, marca, modelo)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ano = searchParams.get('ano');
    const marca = searchParams.get('marca');
    const modelo = searchParams.get('modelo');

    // Faz a busca dos carros assim que a página é carregada
    useEffect(() => {
        let url = `${apiBaseUrl}/cars/`;

        if (ano && marca && modelo) {
            url = `${apiBaseUrl}/cars/buscar/${ano}/${marca}/${modelo}`;
        } else if (ano && marca) {
            url = `${apiBaseUrl}/cars/buscar/${ano}/${marca}`;
        } else if (ano) {
            url = `${apiBaseUrl}/cars/buscar/${ano}`;
        }

        // Faz a requisição à API com os parâmetros de busca
        axios.get(url)
            .then(response => {
                setCarros(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar carros:', error);
            });
    }, [ano, marca, modelo]);

    return (
        <>
        <Header />
        <FundoInicial />

        <h1 className='destaques'>Resultados da Busca</h1>
        <div className="catalogo-carros">
            {carros.length > 0 ? (
                carros.map(carro => (
                    <CarroCliente className="card-carro" key={carro.id} car={carro} />
                ))
            ) : (
                <p>Nenhum carro encontrado para os critérios selecionados.</p>
            )}
        </div>

        <Footer />
        </>
    );
}

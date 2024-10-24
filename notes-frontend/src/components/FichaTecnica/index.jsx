import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const mapeamentoCampos = {
    class: "Classe do Carro",
    transmission: "Transmissão",
    drive: "Tração",
    fuel_type: "Tipo de Combustível",
    cylinders: "Cilindros",
    displacement: "Cilindrada (L)",
    highway_mpg: "Consumo na Estrada (km/l)",
    city_mpg: "Consumo na Cidade (km/l)",
    combination_mpg: "Consumo Combinado (km/l)",
};

export default function FichaTecnica() {
    const { id } = useParams();  // Pega o ID do carro a partir da URL
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Faz a requisição para buscar as informações do carro pelo ID
        axios.get(`http://localhost:8000/cars/${id}/`)
            .then(response => {
                const carData = response.data;  
                setCar(carData);  // Define o estado com os dados do carro
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar dados do carro:", error);
                setError("Erro ao buscar dados do carro.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Carregando ficha técnica...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="ficha-tecnica">
            {car && (
                <div className='tabela'>
                    <h2 className='titulo-carro'>Ficha Técnica de {car.brand || "Desconhecido"} {car.model || "Desconhecido"} ({car.year || "Desconhecido"})</h2>
                    <ul className='tabela'>
                        {Object.keys(mapeamentoCampos).map((key) => {
                            // Verifica se o campo existe e não é nulo ou undefined
                            if (car[key] !== null && car[key] !== undefined) {
                                return (
                                    <li className='linha' key={key}>
                                        <strong className='rotulo'>{mapeamentoCampos[key]}:</strong> 
                                        <div className='valor'>{car[key].toString()}</div>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

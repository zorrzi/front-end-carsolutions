import React, { useState, useEffect } from 'react';
import './index.css';

const Footer = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [carImage, setCarImage] = useState('/carro_cortado.png');

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            // Altera a imagem com base na largura da tela
            if (window.innerWidth < 968) {
                setCarImage('/carro.png');
            } else {
                setCarImage('/carro_cortado.png');
            }
        };

        window.addEventListener('resize', handleResize);

        // Definir a imagem corretamente ao carregar a página
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Fale Conosco</h3>
                    <p>(11) 91234-5678</p>
                </div>
                <div className="footer-section">
                    <h3>Acompanhe nas redes sociais</h3>
                    <div className="social-icons">
                        <img src="/tiktok.png" alt="TikTok" />
                        <img src="/instagram.png" alt="Instagram" />
                        <img src="/facebook.png" alt="Facebook" />
                        <img src="/youtube.png" alt="YouTube" />
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Visite nossa loja</h3>
                    <p>Av. dos Bandeirantes, 2000</p>
                    <p>Vila Olímpia, São Paulo - SP</p>
                    <p>CEP: 04553-900</p>
                </div>

                {/* Imagem do carro trocada dinamicamente */}
                <div className="footer-car-container">
                    <img 
                        className="footer-car"
                        src={carImage} 
                        alt="Carro"
                    />
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Car Solutions S.A. CNPJ: 12.345.678/0001-90 Todos os direitos reservados</p>
            </div>
        </footer>
    );
};

export default Footer;

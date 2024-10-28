import React, { useEffect, useState } from 'react';
import './index.css';

export default function ComoFunciona() {
  const [showSection, setShowSection] = useState({
    sobreNos: false,
    comoFunciona: false,
  });

  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowSection((prevState) => ({
              ...prevState,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    if (showSection.comoFunciona) {
      // Exibir cada passo com um atraso para animação sequencial
      const timer = visibleSteps.length;
      if (timer < 6) {
        const interval = setInterval(() => {
          setVisibleSteps((prevSteps) => [...prevSteps, `passo${prevSteps.length + 1}`]);
        }, 500);
        return () => clearInterval(interval);
      }
    }
  }, [showSection.comoFunciona, visibleSteps.length]);

  return (
    <div className="informacoes-car-solutions-container">
      {/* Bloco Sobre Nós */}
      <div id="sobreNos" className={`section sobre-nos ${showSection.sobreNos ? 'visible' : ''}`}>
        <h2 className="titulo-animado">Sobre a Car Solutions</h2>
        <div className="bloco-conteudo">
          <div className="icone-info">
            <img src="/garantia.png" alt="Confiança" />
            <p className="descricao-animada">Experiência e confiança em cada negociação.</p>
          </div>
          <div className="icone-info">
            <img src="/inovacao.png" alt="Inovação" />
            <p className="descricao-animada">Inovação constante para facilitar sua escolha.</p>
          </div>
          <p className="slogan-animado">"Excelência e Confiabilidade em Cada Detalhe!"</p>
        </div>
      </div>

      {/* Bloco Como Funciona */}
      <div id="comoFunciona" className={`section como-funciona ${showSection.comoFunciona ? 'visible' : ''}`}>
        <h2 className="titulo-animado">Como Funciona</h2>
        <div className="bloco-conteudo">
          {/* Passo 1 */}
          <div className={`passo-info passo ${visibleSteps.includes('passo1') ? 'passo-visible' : ''}`}>
            <img src="/escolhacar.png" alt="Escolha" />
            <p className="passo-animado"><strong>1. Escolha o Carro Ideal:</strong> Explore nosso catálogo e encontre o carro perfeito.</p>
          </div>

          {/* Passo 2 */}
          <div className={`passo-info passo ${visibleSteps.includes('passo2') ? 'passo-visible' : ''}`}>
            <img src="/reservado.png" alt="Reserva" />
            <p className="passo-animado"><strong>2. Reserve a Compra ou o Aluguel:</strong> Faça sua reserva com segurança.</p>
          </div>

          {/* Passo 3 */}
          <div className={`passo-info passo ${visibleSteps.includes('passo3') ? 'passo-visible' : ''}`}>
            <img src="/calendario.png" alt="Data de Retirada" />
            <p className="passo-animado"><strong>3. Escolha a Data de Retirada:</strong> Defina a data ideal para retirar seu veículo.</p>
          </div>

          {/* Passo 4 */}
          <div className={`passo-info passo ${visibleSteps.includes('passo4') ? 'passo-visible' : ''}`}>
            <img src="/rota.png" alt="Data de Entrega" />
            <p className="passo-animado"><strong>4. Defina a Data de Entrega (para Aluguel):</strong> Escolha o período de uso.</p>
          </div>

          {/* Passo 5 */}
          <div className={`passo-info passo ${visibleSteps.includes('passo5') ? 'passo-visible' : ''}`}>
            <img src="/contrato.png" alt="Pagamento e Contrato" />
            <p className="passo-animado"><strong>5. Pagamento e Contrato na Retirada:</strong> Finalize o pagamento e assine o contrato.</p>
          </div>

          {/* Passo 6 */}
          <div className={`passo-info passo ${visibleSteps.includes('passo6') ? 'passo-visible' : ''}`}>
            <img src="/aluguel-de-carros.png" alt="Retirada" />
            <p className="passo-animado"><strong>6. Retire e Aproveite:</strong> Com o contrato finalizado, aproveite seu carro.</p>
          </div>

          <p className="slogan-animado">"Confiança e Comodidade em Cada Passo!"</p>
        </div>
      </div>
    </div>
  );
}

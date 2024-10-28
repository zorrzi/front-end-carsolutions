import React, { useState, useEffect, useRef } from 'react';
import './index.css';

export default function ComoFunciona() {
  const slogans = [
    "Experiência Simples e Prática!",
    "A Escolha Certa para Comprar ou Alugar!",
    "Transparência e Flexibilidade em Cada Passo!",
  ];

  const [sloganIndex, setSloganIndex] = useState(0);
  const [showSlogan, setShowSlogan] = useState(true);
  const passoRefs = useRef([]);

  useEffect(() => {
    // Ciclo para mudar o slogan a cada 4 segundos
    const interval = setInterval(() => {
      setShowSlogan(false);
      setTimeout(() => {
        setSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
        setShowSlogan(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      { threshold: 0.1 }
    );

    passoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      passoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="como-funciona-container">
      <div className={`slogan ${showSlogan ? 'show' : ''}`}>
        <h2>{slogans[sloganIndex]}</h2>
      </div>

      <div className="como-funciona-conteudo">
        <h3>Como Funciona</h3>
        <p>Na Car Solutions, oferecemos uma experiência simples e prática para quem deseja comprar ou alugar um carro. Veja como é fácil:</p>
        
        <ol className="passos">
          {[
            {
              title: "Escolha o Carro Ideal",
              description: "Navegue pelo nosso catálogo e selecione o carro que atenda às suas necessidades. Temos uma ampla variedade de modelos e estilos, tanto para compra quanto para aluguel."
            },
            {
              title: "Reserve a Compra ou o Aluguel",
              description: "Depois de escolher o carro, faça a reserva online indicando se deseja comprá-lo ou alugá-lo. O veículo será reservado conforme sua escolha."
            },
            {
              title: "Escolha a Data de Retirada",
              description: "Selecione a data de retirada do veículo, seja para compra ou aluguel, garantindo que ele estará disponível no momento ideal para você."
            },
            {
              title: "Defina a Data de Entrega (para Aluguel)",
              description: "Se optar pelo aluguel, defina a data de entrega, indicando o período que deseja utilizar o carro. Oferecemos total flexibilidade para atender às suas necessidades."
            },
            {
              title: "Pagamento e Contrato na Retirada",
              description: "No dia da retirada, compareça à nossa loja para finalizar o pagamento. No mesmo momento, geramos o contrato com todas as informações, garantindo total transparência e segurança para sua compra ou aluguel."
            },
            {
              title: "Retire e Aproveite",
              description: "Com o pagamento e contrato concluídos, é só retirar o carro e aproveitar!"
            },
          ].map((passo, index) => (
            <li
              key={index}
              ref={(el) => (passoRefs.current[index] = el)}
              className="passo"
            >
              <strong>{passo.title}</strong>
              <p>{passo.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import './index.css';

export default function SobreNos() {
  const [visibleItems, setVisibleItems] = useState([]);
  const [visibleInovacoes, setVisibleInovacoes] = useState(false);
  const [visibleMetas, setVisibleMetas] = useState(false);

    // Inside useEffect
useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleItems((prevItems) => (prevItems.includes(id) ? prevItems : [...prevItems, id]));
  
            if (id === 'inovacoes') setVisibleInovacoes(true);
            if (id === 'metas-futuras') setVisibleMetas(true);
  
            // For innovation and goal cards
            if (entry.target.classList.contains('inovacao-card')) {
              entry.target.classList.add('inovacao-visible');
            }
            if (entry.target.classList.contains('meta-card')) {
              entry.target.classList.add('meta-visible');
            }
          }
        });
      },
      { threshold: 0.1 }
    );
  
    const items = document.querySelectorAll('.timeline-item, .animated-section, .inovacao-card, .meta-card');
    items.forEach((item) => observer.observe(item));
  
    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleItems((prevItems) => (prevItems.includes(id) ? prevItems : [...prevItems, id]));

            if (id === 'inovacoes') setVisibleInovacoes(true);
            if (id === 'metas-futuras') setVisibleMetas(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    

    const items = document.querySelectorAll('.timeline-item, .animated-section');
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const timelineEvents = [
    { id: '2010', title: 'Fundação', description: 'A Car Solutions foi fundada com o objetivo de transformar o setor automotivo, focada em aluguel de carros e serviço ao cliente.', icon: '/cerimonia-de-abertura.png' },
    { id: '2015', title: 'Expansão Regional', description: 'A empresa ampliou sua presença em novas cidades, com uma frota variada e flexível.', icon: '/brasil.png' },
    { id: '2020', title: 'Inovação Tecnológica', description: 'Lançamos um sistema de IA para gestão de frota e atendimento personalizado.', icon: '/gerenciamento-de-projetos.png' },
    { id: '2023', title: 'Presença Nacional', description: 'Expansão para todas as capitais, com soluções automatizadas e personalizadas.', icon: '/presenca-on-line.png' }
  ];

  const inovacoes = [
    { id: 1, title: 'Atendimento com IA', description: 'Oferecemos suporte personalizado e imediato através de inteligência artificial.', icon: '/conhecimento-de-ia.png' },
    { id: 2, title: 'Gestão Automatizada de Frota', description: 'Monitoramento em tempo real de todos os veículos para otimizar segurança e eficiência.', icon: '/gestao-de-frota.png' },
    { id: 3, title: 'Reservas Online', description: 'Sistema de reservas em tempo real com confirmação instantânea e feedback dos clientes.', icon: '/reserva.png' },
    { id: 4, title: 'Monitoramento de Segurança', description: 'Tecnologias avançadas de rastreamento para garantir a segurança do cliente.', icon: '/escudo-de-seguranca.png' }
  ];

  const metas = [
    { id: 1, title: 'Veículos Elétricos', description: 'Expansão da frota com veículos elétricos para promover a sustentabilidade.', icon: '/carro-eletrico.png' },
    { id: 2, title: 'Serviços Online', description: 'Maior integração de serviços e processos de locação totalmente digitalizados.', icon: '/servico-on-line.png' },
    { id: 3, title: 'Parcerias Estratégicas', description: 'Alianças com grandes players do setor para ampliar a experiência do cliente.', icon: '/parceria.png' },
    { id: 4, title: 'Soluções de Mobilidade', description: 'Integração com aplicativos de mobilidade para uma experiência fluida e acessível.', icon: '/dispositivos.png' }
  ];

  return (
    <div className="sobre-nos-container">
      {/* Banner de Introdução */}
      <section className="banner-introducao">
        <h1 className="titulo-banner">Bem-vindo à Car Solutions</h1>
        <p className="slogan">Excelência e inovação em cada quilômetro de sua jornada automotiva</p>
      </section>

    <section className="linha-do-tempo">
    <h2 className="titulo-secao">Nossa Trajetória</h2>
    <div className="timeline-container">
        <div className="timeline-events">
        <div className="timeline-line"></div> {/* Mova a linha para dentro de timeline-events */}
        {timelineEvents.map((event) => (
            <div
            key={event.id}
            id={event.id}
            className={`timeline-item ${visibleItems.includes(event.id) ? 'item-visible' : ''}`}
            >
            <div className="timeline-content">
                <span className="timeline-date">{event.id}</span>
                <img src={event.icon} alt={event.title} className="timeline-icon" />
                <h3>{event.title}</h3>
                <p>{event.description}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
    </section>




      {/* Nossas Inovações */}
      <section id="inovacoes" className={`animated-section inovacoes ${visibleInovacoes ? 'section-visible' : ''}`}>
        <h2 className="titulo-secao">Nossas Inovações</h2>
        <div className="inovacoes-cards">
          {inovacoes.map((inovacao) => (
            <div key={inovacao.id} className="inovacao-card">
              <img src={inovacao.icon} alt={inovacao.title} className="card-icon" />
              <h3>{inovacao.title}</h3>
              <p>{inovacao.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nossos Próximos Passos */}
      <section id="metas-futuras" className={`animated-section metas-futuras ${visibleMetas ? 'section-visible' : ''}`}>
        <h2 className="titulo-secao">Nossos Próximos Passos</h2>
        <div className="metas-cards">
          {metas.map((meta) => (
            <div key={meta.id} className="meta-card">
              <img src={meta.icon} alt={meta.title} className="card-icon" />
              <h3>{meta.title}</h3>
              <p>{meta.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

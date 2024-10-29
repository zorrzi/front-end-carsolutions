import React, { useState, useEffect } from 'react';
import './index.css';

export default function Carousel({ featuredCars = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredCars.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredCars.length);
      }, 3000); // Troca a cada 3 segundos
      return () => clearInterval(interval);
    }
  }, [featuredCars.length]);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + featuredCars.length) % featuredCars.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % featuredCars.length);
  };

  if (featuredCars.length === 0) {
    return <div className="carousel">Nenhum carro em destaque disponível</div>;
  }

  return (
    <div className="carousel">
      <div
        className="carousel-slide"
        style={{ backgroundImage: `url(${featuredCars[currentIndex].image})` }}
      >
        <div className="carousel-content">
          <h2>{featuredCars[currentIndex].name}</h2>
          <p>{featuredCars[currentIndex].description}</p>
          <span className="carousel-price">Preço: {featuredCars[currentIndex].price}</span>
        </div>
      </div>
      <div className="carousel-controls">
        <button onClick={handlePrev}>◀</button>
        <button onClick={handleNext}>▶</button>
      </div>
    </div>
  );
}

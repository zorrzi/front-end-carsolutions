import React from "react";
import "./index.css";

export default function Footer() {
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
          <p>
            Av. dos Bandeirantes, 2000 <br />
            Vila Olimpia, São Paulo - SP <br />
            CEP: 04553-900
          </p>
        </div>
        <div className="footer-section">
        <img className="footer-car" src="/carro.png" alt="Carro" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2024 Car Solutions S.A. CNPJ: 12.345.678/0001-90 Todos os direitos
          reservados
        </p>
      </div>
    </footer>
  );
}

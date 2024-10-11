import "./index.css";

export default function Carro() {
  return (
    <>
    
    <div className="card">
        <div className="nome">
            <p className="card-title">Honda</p>
            <p className="card-subtitle">Civic</p>
        </div>
      <div>
        <img className="carro" src="/civic.jpg" alt="Carro" />
      </div>
      <p className="card-content">Ver mais</p>
    </div>
    

    </>
    

    
  );
}
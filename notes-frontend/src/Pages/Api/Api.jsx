import { useEffect } from 'react';

export default function CarQueryAPI() {

  useEffect(() => {
    // Função para carregar scripts dinamicamente
    const loadScript = (src, callback) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = callback;
      document.body.appendChild(script);
    };

    // Carregar jQuery primeiro, depois CarQuery
    loadScript('http://www.carqueryapi.com/js/jquery.min.js', () => {
      loadScript('http://www.carqueryapi.com/js/carquery.0.3.4.js', () => {
        // Após os scripts serem carregados, inicializar a CarQuery
        const initCarQuery = () => {
          const carquery = new window.CarQuery();

          // Iniciar CarQuery
          carquery.init();

          // Filtrar modelos vendidos nos EUA
          carquery.setFilters({ sold_in_us: true });

          // Inicializar os dropdowns
          carquery.initYearMakeModelTrim('car-years', 'car-makes', 'car-models', 'car-model-trims');

          // Botão para mostrar os dados do modelo selecionado
          document.getElementById('cq-show-data').addEventListener('click', () => {
            carquery.populateCarData('car-model-data');
          });

          // Definir ano mínimo e máximo para os seletores
          carquery.year_select_min = 1990;
          carquery.year_select_max = new Date().getFullYear();
        };

        // Chamar a função de inicialização após os scripts estarem prontos
        initCarQuery();
      });
    });
  }, []);

  return (
    <div>
      <h1>Car Query API</h1>
      {/* Select elements que serão preenchidos pela API */}
      <select name="car-years" id="car-years"></select>
      <select name="car-makes" id="car-makes"></select>
      <select name="car-models" id="car-models"></select>
      <select name="car-model-trims" id="car-model-trims"></select>

      {/* Botão para exibir os dados do modelo selecionado */}
      <button id="cq-show-data">Show Data</button>

      {/* Elemento onde os dados do modelo serão exibidos */}
      <div id="car-model-data"></div>
    </div>
  );
}

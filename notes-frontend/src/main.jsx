import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './Pages/App/App.jsx';
import LoginCliente from './Pages/LoginCliente/loginCliente.jsx';
import SignupCliente from './Pages/SignupCliente/signupCliente.jsx';
import FuncionarioInicial from './Pages/FuncionarioInicial/FuncionarioInicial.jsx';
import RotaProtegidaFuncionario from './components/RotaProtegidaFuncionario';
import AdicionarVeiculo from './Pages/AdicionarVeiculo/AdicionarVeiculo.jsx';
import Api from './Pages/Api/Api.jsx';
import LoginFuncionario from './Pages/LoginFuncionario/LoginFuncionario.jsx';
import AnuncioCarro from './Pages/AnuncioCarro/AnuncioCarro.jsx';
import EditarCarro from './Pages/EditarCarro/EditarCarro.jsx';
import CarrosFavoritos from './Pages/CarrosFavoritos/CarrosFavoritos.jsx';
import ResultadosBusca from './Pages/ResultadoBusca/ResultadoBusca.jsx';
import AgendamentoCliente from './Pages/AgendamentosCliente/AgendamentosCliente.jsx';
import AgendamentosFuncionario from './Pages/AgendamentosFuncionario/AgendamentosFuncionario.jsx';
import CarrosCompra from './Pages/CarrosCompra/CarrosCompra.jsx';
import CarrosAluguel from './Pages/CarrosAluguel/CarrosAluguel.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/loginCliente",
    element: <LoginCliente />,
  },
  {
    path: "/signupCliente",
    element: <SignupCliente />,
  },
  {
    path: "/funcionario",
    element: (
      <RotaProtegidaFuncionario>
        <FuncionarioInicial />
      </RotaProtegidaFuncionario>
    ),
  },
  {
    path: "/adicionarVeiculo",
    element: <AdicionarVeiculo />,
  },
  {
    path: "/api",
    element: <Api />,
  },
  {
    path: "/loginFuncionario",
    element: <LoginFuncionario />,
  },
  {
    path: "/anuncio/:id",
    element: <AnuncioCarro />,
  },

  {
    path: "/editarCarro/:id",
    element: <EditarCarro />,
  },

  {
    path: "/carrosFavoritos",
    element: <CarrosFavoritos />,
  },

  
  {
    path: "/resultados",
    element: <ResultadosBusca />,
  },

  {
    path: "/agendamentoCliente",
    element: <AgendamentoCliente />,
  },

  {
    path: "/agendamentosFuncionario",
    element: <AgendamentosFuncionario />,
  },

  {
    path: "/carrosCompra",
    element: <CarrosCompra />,
  },

  {
    path: "/carrosAluguel",
    element: <CarrosAluguel />,
  },


  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

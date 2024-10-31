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
import AgendamentoCliente from './Pages/AgendamentosCliente/AgendamentosCliente.jsx';
import AgendamentosFuncionario from './Pages/AgendamentosFuncionario/AgendamentosFuncionario.jsx';
import CarrosDisponiveis from './Pages/CarrosDisponiveis/CarrosDisponiveis.jsx';
import SobreNos from './Pages/SobreNos/SobreNos.jsx';
import EsqueciMinhaSenha from './Pages/EsqueciMinhaSenha/EsqueciMinhaSenha.jsx';
import RedefinirSenha from './Pages/RedefinirSenha/RedefinirSenha.jsx';


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
    path: "/agendamentoCliente",
    element: <AgendamentoCliente />,
  },

  {
    path: "/agendamentosFuncionario",
    element: <AgendamentosFuncionario />,
  },


  {
    path: "/carrosDisponiveis",
    element: <CarrosDisponiveis />,
  },

  {
    path: "/sobreNos",
    element: <SobreNos />,
  },

  {
    path: "/esqueciMinhaSenha",
    element: <EsqueciMinhaSenha/>,
  },

  {
    path: "/redefinirSenha/:uid/:token",
    element: <RedefinirSenha/>,
  },



  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

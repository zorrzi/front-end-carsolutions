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
import RedirecionarFuncionario from './components/RedirecionarFuncionario/index.jsx';
import AdicionarVeiculo from './Pages/AdicionarVeiculo/AdicionarVeiculo.jsx';
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
    element: (
    <RedirecionarFuncionario>
      <App />
    </RedirecionarFuncionario>
    ),
  },
  {
    path: "/loginCliente",
    element: (
    <RedirecionarFuncionario>
      <LoginCliente />
    </RedirecionarFuncionario>
    ),
  },
  {
    path: "/signupCliente",
    element: (
    <RedirecionarFuncionario>
      <SignupCliente />
    </RedirecionarFuncionario>
    ),
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
    element: (
    <RotaProtegidaFuncionario>
      <AdicionarVeiculo />
    </RotaProtegidaFuncionario>
    ),
  },
  {
    path: "/loginFuncionario",
    element: (
    <RedirecionarFuncionario>
      <LoginFuncionario />
    </RedirecionarFuncionario>
    ),
  },
  {
    path: "/anuncio/:id",
    element: (
    <RedirecionarFuncionario>
      <AnuncioCarro />
    </RedirecionarFuncionario>
    ),
  },

  {
    path: "/editarCarro/:id",
    element: (
    <RotaProtegidaFuncionario>
      <EditarCarro />
    </RotaProtegidaFuncionario>
    ),
  },

  {
    path: "/carrosFavoritos",
    element:(
    <RedirecionarFuncionario> 
      <CarrosFavoritos />
    </RedirecionarFuncionario>
    ),
  },

  {
    path: "/agendamentoCliente",
    element: (
    <RedirecionarFuncionario>
      <AgendamentoCliente />
    </RedirecionarFuncionario>
    ),
  },

  {
    path: "/agendamentosFuncionario",
    element: (
    <RotaProtegidaFuncionario>
      <AgendamentosFuncionario />
    </RotaProtegidaFuncionario>
    ),
  },


  {
    path: "/carrosDisponiveis",
    element: (
    <RedirecionarFuncionario>
      <CarrosDisponiveis />
    </RedirecionarFuncionario>
    ),
  },

  {
    path: "/sobreNos",
    element: (
    <RedirecionarFuncionario>
      <SobreNos />
    </RedirecionarFuncionario>
    ),
  },

  {
    path: "/esqueciMinhaSenha",
    element: (
    <RedirecionarFuncionario>
      <EsqueciMinhaSenha/>
    </RedirecionarFuncionario>
    ),
  },

  {
    path: "/redefinirSenha/:uid/:token",
    element: (
    <RedirecionarFuncionario>
      <RedefinirSenha/>
    </RedirecionarFuncionario>
    ),
  },



  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

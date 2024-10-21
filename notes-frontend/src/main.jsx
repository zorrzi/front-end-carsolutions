import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './Pages/App/App.jsx'
import LoginCliente from './Pages/LoginCliente/loginCliente.jsx';
import SignupCliente from './Pages/SignupCliente/signupCliente.jsx';
import FuncionarioInicial from './Pages/FuncionarioInicial/FuncionarioInicial.jsx';
import AdicionarVeiculo from './Pages/AdicionarVeiculo/AdicionarVeiculo.jsx';
import Api from './Pages/Api/Api.jsx';
import LoginFuncionario from './Pages/LoginFuncionario/LoginFuncionario.jsx';


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
    element: <FuncionarioInicial />,
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


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RedirecionarFuncionario({ children }) {
  const isFuncionario = localStorage.getItem('isFuncionario'); // Pega o role do usuário

  if (isFuncionario === 'true') {
    return <Navigate to="/funcionario" />;
  }

  return children;
}

import { Navigate } from 'react-router-dom';

// Componente de rota protegida
export default function ProtectedRouteFuncionario({ children }) {
  const isFuncionario = localStorage.getItem('isFuncionario');
  const username = localStorage.getItem('username');

  if (!username || isFuncionario !== 'true') {
    return <Navigate to="/loginFuncionario" />;
  }

  return children;
}

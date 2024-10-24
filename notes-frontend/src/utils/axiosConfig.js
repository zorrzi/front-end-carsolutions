import axios from 'axios';
import { getCSRFToken } from './csrf';  // Assumindo que você já criou o arquivo 'csrf.js' com a função getCSRFToken

// Definir axios para usar o CSRF token automaticamente
axios.defaults.withCredentials = true;  // Garantir que os cookies de sessão sejam enviados

// Intercepta todas as requisições e adiciona o CSRF token onde necessário
axios.interceptors.request.use(config => {
  const method = config.method.toUpperCase();
  if (['POST', 'PUT', 'DELETE', 'GET'].includes(method)) {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axios;

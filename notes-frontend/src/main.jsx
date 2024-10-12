import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './Pages/App/App.jsx'
import UserLogin from './Pages/UserLogin/UserLogin.jsx';
import UserSignup from './Pages/UserSignup/UserSignup.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/userLogin",
    element: <UserLogin />,
  },

  {
    path: "/userSignup",
    element: <UserSignup />,
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
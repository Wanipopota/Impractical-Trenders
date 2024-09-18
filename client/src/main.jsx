// client/src/main.jsx
import React from 'react';  // import React from 'react';
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client';  // import { ApolloProvider } from '@apollo/client'; to import the ApolloProvider component.

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail'; 
import Login from './pages/Login';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import client from './utils/apolloClient'; 
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',  
        element: <Signup />  
      }, {
        path: '/success',
        element: <Success />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      }, {
        path: '/products/:id',
        element: <Detail />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
import React from 'react'; // Add this import for React
import ReactDOM from 'react-dom/client';
//import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'; // Make sure to import ApolloProvider

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail'; 
import Login from './pages/Login';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import client from './utils/apolloClient'; // Make sure to create this file as described in the previous message

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, 
        element: <Home />
      }, 
      {
        path: '/login',
        element: <Login />
      }, 
      {
        path: '/success',
        element: <Success />
      }, 
      {
        path: '/orderHistory',
        element: <OrderHistory />
      }, 
      {
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

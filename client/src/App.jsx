// client/src/App.jsx:

import React from 'react';
import { Outlet } from 'react-router-dom';

import Nav from './components/Nav';
import Footer from './components/Footer'; // Import the Footer component
import { StoreProvider } from './utils/GlobalState';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <StoreProvider>
        <Nav />
        <main className="container mx-auto flex-grow p-4">
          <Outlet />
        </main>
        <Footer /> {/* Add the Footer component here */}
      </StoreProvider>
    </div>
  );
}

export default App;
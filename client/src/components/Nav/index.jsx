import React from 'react';
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";

import { useStoreContext } from "../../utils/GlobalState";

function Nav() {
  const [state] = useStoreContext();

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="flex items-center">
          <Link to="/orderHistory" className="text-white hover:text-sunflower mr-4">
            Order History
          </Link>
          <button onClick={() => Auth.logout()} className="text-white hover:text-sunflower">
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <Link to="/signup" className="text-white hover:text-sunflower mr-4">
            Signup
          </Link>
          <Link to="/login" className="text-white hover:text-sunflower">
            Login
          </Link>
        </div>
      );
    }
  }

  return (
    <header className="bg-forest-green p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-auto mr-2" />
          <Link to="/" className="text-white text-2xl font-bold">
            The Impractical Trenders
          </Link>
        </div>
        <nav>{showNavigation()}</nav>
      </div>
    </header>
  );
}

export default Nav;
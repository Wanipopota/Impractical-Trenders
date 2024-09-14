import Auth from "../../utils/auth";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout the user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      // If user is on the login page, show the "Go to Home" button
      if (location.pathname === "/login") {
        return (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/">Go to Home</Link>
            </li>
          </ul>
        );
      } else {
        // Default: show the "Log In/Sign Up" button
        return (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/login">Log In/Sign Up</Link>
            </li>
          </ul>
        );
      }
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">Impractical Tenders</Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;

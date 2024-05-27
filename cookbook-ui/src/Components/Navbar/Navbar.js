import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

function Navbar() {
  const { logOutUser } = useContext(UserContext);

  const navigateTo = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { user } = useContext(UserContext);

  const handleNavigation = (route) => {
    navigateTo(route);
    setIsNavCollapsed(true); 
  };

  const handleNavigationLogo = () => { // This function is called when the user clicks the logo. Logged in = dashboard, not logged in = home.
    if (user) {
      navigateTo("/dashboard");
    } else {
      navigateTo("/home");
    }
    setIsNavCollapsed(true); 
  };
  
// This function is called when the user clicks the "Logout" button.
const logOut = async () => {
  try {
    // Calling the logOutUser function from the user context.
    const loggedOut = await logOutUser();
    // Now we will refresh the page, and the user will be logged out and
    // redirected to the login page because of the <PrivateRoute /> component.
    if (loggedOut) {
      window.location.reload(true);
    }
  } catch (error) {
    alert(error)
  }
}

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <p className="navbar-brand" onClick={() => handleNavigationLogo("/dashboard")}>
        <code className="logo-symbol"> 🥘 CookBook Maker</code>
      </p>
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleNavToggle} 
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse justify-content-end`}
      >
        <ul className="navbar-nav"> 
          {user ? ( // If the user is logged in then show the dashboard and logout buttons.
            <>
              <li className="nav-item">
                <p className="nav-link" onClick={() => handleNavigation("/dashboard")}>
                  <span id="dashboard">Dashboard</span>
                </p>
              </li>
              <li className="nav-item">
                <p className="nav-link" onClick={logOut}>
                  <span id="logout">Logout</span>
                </p>
              </li>
            </>
          ) : ( // If the user is not logged in then show the login and register buttons.
            <>
              <li className="nav-item">
                <p className="nav-link" onClick={() => handleNavigation("/login")}>
                  <span id="login">Login</span>
                </p>
              </li>
              <li className="nav-item">
                <p className="nav-link" onClick={() => handleNavigation("/signup")}>
                  <span id="register">Register</span>
                </p>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const navigateTo = useNavigate();
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavigation = (route) => {
    navigateTo(route);
    setIsNavCollapsed(true); 
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleSignup = () => {
    loginWithRedirect({ screen_hint: "signup" });
  };

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <p className="navbar-brand" onClick={() => handleNavigation("/")}>
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
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <p className="nav-link" onClick={() => handleNavigation("/")}>
                  <span id="dashboard">Dashboard</span>
                </p>
              </li>
              <li className="nav-item">
                <p className="nav-link" onClick={() => handleNavigation("/profile")}>
                  <span id="profile">Profile</span>
                </p>
              </li>
              <li className="nav-item">
                <p className="nav-link" onClick={handleLogout}>
                  <span id="logout">Logout</span>
                </p>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <p className="nav-link" onClick={handleLogin}>
                  <span id="login">Login</span>
                </p>
              </li>
              <li className="nav-item">
                <p className="nav-link" onClick={handleSignup}>
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

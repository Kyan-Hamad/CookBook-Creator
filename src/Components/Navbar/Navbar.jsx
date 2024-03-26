import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const navigateTo = useNavigate();
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const handleNavigation = (route) => {
    navigateTo(route);
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

  return (
    <>
      {isAuthenticated ? (
        // this is the authenticated navbar!!
        <nav className="navbar navbar-expand-lg navbar-light">
          <p className="navbar-brand" onClick={() => handleNavigation("/")}>
            <code className="logo-symbol"> 🥘 </code>
            {/* <span id="kanbanflow-logo" className="gradient-text">
              KanbanFlow
            </span> */}
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <p
                  className="nav-link"
                  onClick={() => handleNavigation("/CreationPage")}
                >
                  <span id="login">Create</span>
                </p>
              </li>
              <li className="nav-item">

                <p
                  className="nav-link"
                  onClick={() => handleNavigation("/")}
                >
                  <span id="login">Dashboard</span>
                </p>
              </li>
              <li className="nav-item">
                <p
                  className="nav-link"
                  onClick={() => handleNavigation("/profile")}
                >
                  <span id="login">Profile</span>
                </p>
              </li>
              <li className="nav-item">

                <p className="nav-link" onClick={handleLogout}>
                  <span id="register">Logout</span>
                </p>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        // this is the unauthenticated navbar!!!
        <nav className="navbar navbar-expand-lg navbar-light">
          <p className="navbar-brand" onClick={() => handleNavigation("/")}>
            <code className="logo-symbol"> 🥘</code>
            <span id="cookbook-maker-logo" className="gradient-text">
              CookBook Maker
            </span>
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <p
                  className="nav-link"
                  // onClick={() => handleNavigation("/login")}
                  // onClick={loginWithRedirect()}
                  onClick={handleLogin}
                >
                  <span id="login">Login</span>
                </p>
              </li>
              <li className="nav-item">
                <p
                  className="nav-link"
                  // onClick={() => handleNavigation("/register")}
                  // onClick={handleRegister}
                  onClick={handleSignup}
                >
                  <span id="register">Register</span>
                </p>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}


import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const navigateTo = useNavigate();

  const handleNavigation = (route) => {
    navigateTo(route);
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <div className="user-container">
            <h3> Welcome, {user.nickname} </h3>
            <p> Email : {user.email} </p>
            <img src={user.picture} alt="" />
          </div>

          <div className="links">
            <button className="link-btn" onClick={() => handleNavigation("/")}> View WorkFlows </button>
            <button className="link-btn" onClick={() => handleNavigation("/Workflow")}> Create Board </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Not Authenticated!! </h1>
        </div>
      )}
    </>
  );
}

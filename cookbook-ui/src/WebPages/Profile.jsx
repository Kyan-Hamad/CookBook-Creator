import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();



  return (
    <>
      {isAuthenticated ? (
        <div>
          <div className="user-container">
            <h3> Welcome, {user.nickname} </h3>
            <p> Email : {user.email} </p>
            <img src={user.picture} alt="" />
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

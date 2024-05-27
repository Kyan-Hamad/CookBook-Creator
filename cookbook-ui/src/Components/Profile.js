import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";

function Profile() {
  // Access the user context to get user information
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
          {/* You can add more user information here */}
        </div>
      ) : (
        <p>Please login to view your profile.</p>
      )}
    </div>
  );
}

export default Profile;

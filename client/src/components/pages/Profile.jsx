import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Profile.css";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { userId, userName, userPicture, handleLogout } = useContext(UserContext);

  return (
    <div className="Profile-container">
      <div className="u-heading">Profile</div>
      {userId ? (
        <div className="Profile-details">
          <img src={userPicture} alt={`${userName}'s profile`} className="Profile-picture" />
          <p className="Profile-name">Welcome, {userName}!</p>
        </div>
      ) : (
        <div>
          <p>Please log in to view your profile.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;

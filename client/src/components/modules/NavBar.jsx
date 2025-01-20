import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "./NavBar.css";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  const onLogout = () => {
    googleLogout(); // Log out from Google
    handleLogout(); // Clear context and state
  };

  return (
    <nav className="NavBar-container">
      <div className="NavBar-leftcontent">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/profile" className="NavBar-link">
          Profile
        </Link>
      </div>
      <div className="NavBar-linkContainer"></div> {/* This will take up the middle space */}
      <div className="NavBar-rightcontent">
        {userId ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <GoogleLogin
            onSuccess={handleLogin}
            onError={(err) => console.log(err)}
            scope="profile email" // Ensure the 'profile' scope is requested
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;

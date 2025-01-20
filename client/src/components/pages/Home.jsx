import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <div className="Home-container">

      {/* Title and links */}
      <div className="Home-title">Branch & Bite @ MIT</div>
      <div className="Home-linkContainer u-inlineBlock">
        <Link to="/Maseeh" className="Home-link">
          Maseeh
        </Link>
        {/* future dorms: */}
        {/* <Link to="/McCormick" className="Home-link">
          McCormick
        </Link>
        <Link to="/Baker" className="Home-link">
          Baker
        </Link>
        <Link to="/New-Vassar" className="Home-link">
          New Vassar
        </Link>
        <Link to="/Simmons" className="Home-link">
          Simmons
        </Link>
        <Link to="/Next" className="Home-link">
          Next
        </Link> */}
      </div>

{/* ///////////////////////////////////////// */}

      <hr />
      <div className="Home-about"> About Us </div>
    </div>
  );
};

export default Home;

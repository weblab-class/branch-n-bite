import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";
import "./Maseeh.css";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <div className="Home-container">
      {/* Title and links */}
      <div className="Home-title">🌱 Branch & Bite @ MIT 🌱</div>
      <Link to="/maseeh" style={{ textDecoration: "none", display: "inline-block" }}>
        <button>Maseeh</button>
      </Link>
      {/* <div className="Home-linkContainer u-inlineBlock">
        <Link to="/Maseeh" className="Home-link">
          Maseeh
        </Link> */}
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
      {/* </div> */}

      {/* ///////////////////////////////////////// */}

      <div className="u-heading"> About Us </div>
      <div className="Home-about-container">
        <div style={{ width: "30%" }}>
          <p>
            Welcome to Branch & Bite, an initiative by our web.lab team dedicated to supporting a
            healthier and happier student body. Our platform categorizes the Bon Appetit dining hall
            menu items into the five food groups, ensuring that every meal choice contributes to a
            balanced diet. By generating personalized, optimized meal plans, we aim to make it
            easier for students to make healthier food choices while navigating the dining options
            available to them, helping them maintain a nutritious lifestyle throughout the school
            year.
          </p>
        </div>
        <div className="Home-plate-container">
          <div className="Maseeh-circle">
            <div className="Maseeh-inner-circle">
              <div className="Maseeh-quarter-circle Maseeh-top-left">
                <span className="Maseeh-text">Fruit</span>
              </div>
              <div className="Maseeh-quarter-circle Maseeh-bottom-left">
                <span className="Maseeh-text Maseeh-text-bottom-left">Vegetables</span>
              </div>
              <div className="Maseeh-quarter-circle Maseeh-top-right">
                <span className="Maseeh-text Maseeh-text-top-right">Grains</span>
              </div>
              <div className="Maseeh-quarter-circle Maseeh-bottom-right">
                <span className="Maseeh-text Maseeh-text-bottom-right">Protein</span>
              </div>
            </div>
          </div>
        </div>
        <div className="Maseeh-dairy-circle">
          <div className="Maseeh-dairy-inner-circle">
            <span className="Maseeh-text">Dairy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

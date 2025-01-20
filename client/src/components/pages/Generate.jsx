import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Generate.css";
import "./Maseeh.css";
import { UserContext } from "../context/UserContext";

const Generate = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
      <div className="Maseeh-container">
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
    </>
  );
};

export default Generate;

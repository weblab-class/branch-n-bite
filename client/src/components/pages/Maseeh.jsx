import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Maseeh.css";
import { UserContext } from "../context/UserContext";

const Maseeh = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
      <div className="Maseeh-container">
        <div className="Maseeh-circle">
          <div className="Maseeh-quarter-circle Maseeh-top-left"></div>
          <div className="Maseeh-quarter-circle Maseeh-bottom-left"></div>
        </div>
      </div>
    </>
  );
};

export default Maseeh;

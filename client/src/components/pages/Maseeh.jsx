import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Maseeh.css";
import "./Generate.css";
import { UserContext } from "../context/UserContext";

const Maseeh = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
      <div className="u-heading-container">
        <a href="/">
          <img
            src="data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20id%3D%22icons_1_%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%220%22%20y%3D%220%22%20viewBox%3D%220%200%20128%20128%22%20style%3D%22enable-background%3Anew%200%200%20128%20128%22%20xml%3Aspace%3D%22preserve%22%3E%3Cstyle%3E.st0%7Bdisplay%3Anone%7D.st1%7Bdisplay%3Ainline%7D.st2%7Bfill%3A%230a0a0a%7D%3C%2Fstyle%3E%3Cg%20id%3D%22row2_1_%22%3E%3Cg%20id%3D%22_x32__4_%22%3E%3Cpath%20class%3D%22st2%22%20d%3D%22M64%20.3C28.7.3%200%2028.8%200%2064s28.7%2063.7%2064%2063.7%2064-28.5%2064-63.7S99.3.3%2064%20.3zm0%20121C32.2%20121.3%206.4%2095.7%206.4%2064%206.4%2032.3%2032.2%206.7%2064%206.7s57.6%2025.7%2057.6%2057.3c0%2031.7-25.8%2057.3-57.6%2057.3zm22.4-63.7H57.6l12.3-15.2c0-2.2-1.8-3.9-3.9-3.9h-7.1L32%2064l26.8%2025.5H66c2.2%200%203.9-1.8%203.9-3.9L57.1%2069.9h28.6c2.2%200%203.9-1.8%203.9-3.9v-4c0-2.1-1-4.4-3.2-4.4z%22%20id%3D%22left_1_%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            alt="back"
            className="u-backarrow"
          />
        </a>
        <div className="u-heading">Maseeh Dining</div>
      </div>
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
      <div className="Generate-container">
        <a href="/generate" style={{ textDecoration: "none", display: "inline-block" }}>
          <button>Generate meal</button>
        </a>
      </div>
    </>
  );
};

export default Maseeh;

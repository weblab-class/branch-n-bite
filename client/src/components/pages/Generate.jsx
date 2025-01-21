import React, { useContext, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Generate.css";
import "./Maseeh.css";
import { UserContext } from "../context/UserContext";

const Generate = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [generatedPlate, setGeneratedPlate] = useState({});

  function generateMeal(date, dorm, meal, group, inclusions, exclusions) {
    get("/api/generateMeal", {
      date: date,
      dorm: dorm,
      meal: meal,
      group: group,
      // inclusions: inclusions,
      // exclusions: exclusions
    }).then((plate) => {
      // plate is a dictionary mapping each group to item
      setGeneratedPlate(plate);
    });
  }

  return (
    <>
      <div className="u-heading-container">
        <a href="/Maseeh">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="u-backarrow">
            <g>
              <path
                class="u-backarrow-path"
                d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm22.4-63.7H57.6l12.3-15.2c0-2.2-1.8-3.9-3.9-3.9h-7.1L32 64l26.8 25.5H66c2.2 0 3.9-1.8 3.9-3.9L57.1 69.9h28.6c2.2 0 3.9-1.8 3.9-3.9v-4c0-2.1-1-4.4-3.2-4.4z"
              />
            </g>
          </svg>
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
        <button>
          Regenerate
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21.986">
            <path d="M19.841 3.24A10.988 10.988 0 0 0 8.54.573l1.266 3.8a7.033 7.033 0 0 1 8.809 9.158L17 11.891v7.092h7l-2.407-2.439A11.049 11.049 0 0 0 19.841 3.24zM1 10.942a11.05 11.05 0 0 0 11.013 11.044 11.114 11.114 0 0 0 3.521-.575l-1.266-3.8a7.035 7.035 0 0 1-8.788-9.22L7 9.891V6.034c.021-.02.038-.044.06-.065L7 5.909V2.982H0l2.482 2.449A10.951 10.951 0 0 0 1 10.942z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Generate;

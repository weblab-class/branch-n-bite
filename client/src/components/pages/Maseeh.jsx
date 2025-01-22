import React, { useContext, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Maseeh.css";
import "./Generate.css";
import { UserContext } from "../context/UserContext";
import { get, post } from "../../utilities";

/**
 * Returns today's date in YYYY-MM-DD format.
 */
function getTodayDate() {
  return new Date().toJSON().slice(0, 10);
}

const Maseeh = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);

  function showFoodGroup(date, dorm, meal, group, inclusions, exclusions) {
    get("/api/getFoodList", { date: date, dorm: dorm, meal: meal, group: group }).then(
      (foodList) => {
        if (group === "fruits" || group === "vegetables") {
          // foodList = ["apple", "banana", "orange", "grapes", "strawberries"];
          // TODO fix hardcoding
          if (group === "fruits") {
            if (foodList.length) foodList.push("And more fruits from the fruit bar!");
            else foodList.push("Get some fruits from the fruit bar!");
          }
          setLeftList(foodList);
          setRightList([]);
        }
        if (group === "grains" || group === "protein" || group === "dairy") {
          // foodList = ["rice", "bread", "pasta", "chicken", "beef", "tofu", "milk", "cheese"];
          setRightList(foodList);
          setLeftList([]);
        }
      }
    );
  }

  return (
    <>
      <div className="u-heading-container">
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="u-backarrow">
            <g>
              <path d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm22.4-63.7H57.6l12.3-15.2c0-2.2-1.8-3.9-3.9-3.9h-7.1L32 64l26.8 25.5H66c2.2 0 3.9-1.8 3.9-3.9L57.1 69.9h28.6c2.2 0 3.9-1.8 3.9-3.9v-4c0-2.1-1-4.4-3.2-4.4z" />
            </g>
          </svg>
        </a>
        <div className="u-heading">Maseeh Dining: Click through the 5 food groups!</div>
      </div>
      <div className="Maseeh-container">
        <section className="Maseeh-food-list">
          <ul>
            {leftList.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
          {console.log("clicked", leftList)}
        </section>
        <div className="Maseeh-grid">
          <div className="Maseeh-plate-wrapper">
            <div className="Maseeh-circle">
              <div className="Maseeh-inner-circle">
                <div
                  className="Maseeh-quarter-circle Maseeh-top-left"
                  onClick={() => {
                    // Gets today's date in YYYY-MM-DD format
                    showFoodGroup(getTodayDate(), "maseeh", "dinner", "fruits");
                  }}
                >
                  <span className="Maseeh-text">Fruits</span>
                </div>
                <div
                  className="Maseeh-quarter-circle Maseeh-bottom-left"
                  onClick={() => {
                    showFoodGroup(getTodayDate(), "maseeh", "dinner", "vegetables");
                  }}
                >
                  <span className="Maseeh-text Maseeh-text-bottom-left">Vegetables</span>
                </div>
                <div
                  className="Maseeh-quarter-circle Maseeh-top-right"
                  onClick={() => {
                    showFoodGroup(getTodayDate(), "maseeh", "dinner", "grains");
                  }}
                >
                  <span className="Maseeh-text Maseeh-text-top-right">Grains</span>
                </div>
                <div
                  className="Maseeh-quarter-circle Maseeh-bottom-right"
                  onClick={() => {
                    showFoodGroup(getTodayDate(), "maseeh", "dinner", "protein");
                  }}
                >
                  <span className="Maseeh-text Maseeh-text-bottom-right">Protein</span>
                </div>
              </div>
            </div>
          </div>
          <div className="Maseeh-dairy-circle">
            <div
              className="Maseeh-dairy-inner-circle"
              onClick={() => {
                showFoodGroup(getTodayDate(), "maseeh", "dinner", "dairy");
              }}
            >
              <span className="Maseeh-text">Dairy</span>
            </div>
          </div>
        </div>
        <section className="Maseeh-food-list">
          <ul>
            {rightList.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
          {console.log("clicked", leftList)}
        </section>
      </div>
      <div className="Generate-container">
        <a href="/generate" className="Maseeh-box-button">
          <button>Generate meal</button>
        </a>
      </div>
    </>
  );
};

export default Maseeh;

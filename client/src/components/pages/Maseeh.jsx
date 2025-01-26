import React, { useContext, useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Maseeh.css";
import "./Generate.css";
import { getTodayDate, getTodayDateOffset } from "../modules/Date.js";
import { getInitDate, getInitDorm, getInitMeal } from "../modules/Params.js";
import { UserContext } from "../context/UserContext";
import { get, post } from "../../utilities";

const Maseeh = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getInitDate());
  const [selectedMeal, setSelectedMeal] = useState(getInitMeal());
  const [currentDorm, setCurrentDorm] = useState(getInitDorm());

  useEffect(() => {
    setLeftList(["Loading..."]);
    setRightList(["Loading..."]);
    get("/api/getFoodList", {
      date: selectedDate,
      dorm: currentDorm,
      meal: selectedMeal,
      group: "fruits",
    }).then((foodList) => {
      setLeftList([]);
      setRightList([]);
    });
  }, [selectedDate, selectedMeal]);

  function handleMealChange(event) {
    setSelectedMeal(event.target.value);
  }

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  function showFoodGroup(date, dorm, meal, group, inclusions, exclusions) {
    console.log(date, dorm, meal, group);
    get("/api/getFoodList", { date: date, dorm: dorm, meal: meal, group: group }).then(
      (foodList) => {
        if(foodList.length === 0) {
          foodList.push(`No ${group} found! This may be because the dining hall is closed, or because no foods served today exist in this category. If the dining hall is open, try the fruit and salad bars!`)
        }
        if (group === "fruits" || group === "vegetables") {
          // foodList = ["apple", "banana", "orange", "grapes", "strawberries"];
          // TODO fix hardcoding
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

  function titleCase(dorm) {
    return dorm
      .replace("-", " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
        <div className="u-heading">
          {titleCase(currentDorm)} Dining: Click through the 5 food groups!
        </div>
      </div>
      <select className="Maseeh-select" value={selectedMeal} onChange={handleMealChange}>
        {/* <option value="breakfast">Breakfast</option> */}
        <option value="brunch">Brunch</option>
        {/* <option value="lunch">Lunch</option> */}
        <option value="dinner">Dinner</option>
        {/* <option value="late-night">Late Night</option> */}
      </select>
      <select className="Maseeh-select" value={selectedDate} onChange={handleDateChange}>
        {[-1, 0, 1, 2, 3, 4, 5, 6, 7].map((dayOffset) => (
          <option value={getTodayDateOffset(dayOffset)}>{getTodayDateOffset(dayOffset)}{dayOffset === 0 ? " (today)" : ""}</option>
        ))}
      </select>
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
                    showFoodGroup(selectedDate, currentDorm, selectedMeal, "fruits");
                  }}
                >
                  <span className="Maseeh-text">Fruits</span>
                </div>
                <div
                  className="Maseeh-quarter-circle Maseeh-bottom-left"
                  onClick={() => {
                    showFoodGroup(selectedDate, currentDorm, selectedMeal, "vegetables");
                  }}
                >
                  <span className="Maseeh-text Maseeh-text-bottom-left">Vegetables</span>
                </div>
                <div
                  className="Maseeh-quarter-circle Maseeh-top-right"
                  onClick={() => {
                    showFoodGroup(selectedDate, currentDorm, selectedMeal, "grains");
                  }}
                >
                  <span className="Maseeh-text Maseeh-text-top-right">Grains</span>
                </div>
                <div
                  className="Maseeh-quarter-circle Maseeh-bottom-right"
                  onClick={() => {
                    showFoodGroup(selectedDate, currentDorm, selectedMeal, "protein");
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
                showFoodGroup(selectedDate, currentDorm, selectedMeal, "dairy");
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
        <a
          href={`/generate?date=${selectedDate}&dorm=${currentDorm}&meal=${selectedMeal}`}
          className="Maseeh-box-button"
        >
          <button>Generate meal</button>
        </a>
      </div>
    </>
  );
};

export default Maseeh;

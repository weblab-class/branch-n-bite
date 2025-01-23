import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Generate.css";
import "./Maseeh.css";
import { getTodayDate, getTodayDateOffset } from "../modules/Date.js"
import { UserContext } from "../context/UserContext";
import { post, get } from "../../utilities";

const Generate = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [ currdate, setDate ] = useState(new Date().toJSON().slice(0, 10));
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedMeal, setSelectedMeal] = useState("dinner");
  const [generatedPlate, setGeneratedPlate] = useState({
    fruits: "Loading...",
    vegetables: "Loading...",
    grains: "Loading...",
    protein: "Loading...",
    dairy: "Loading...",
  });

  function handleMealChange(event) {
    console.log(event.target);
    console.log(event.target.value);
    setSelectedMeal(event.target.value);
  }

  function handleDateChange(event) {
    console.log(`Target value is ${event.target.value}`);
    setSelectedDate(event.target.value);
  }

  function generateMeal(date, dorm, meal, inclusions = [], exclusions = []) {
    console.log(date, dorm, meal);
    get("/api/generateMeal", {
      date: date,
      dorm: dorm,
      meal: meal,
      inclusions: inclusions,
      exclusions: exclusions
    }).then((plate) => {
      // plate is a dictionary mapping each group to item
      const finalPlate = {
        fruits: (plate["fruits"] ? plate["fruits"] : "Get some fruits from the fruit bar!"),
        vegetables: plate["vegetables"],
        grains: plate["grains"],
        protein: plate["protein"],
        dairy: plate["dairy"],
      };
      console.log(`final plate is ${finalPlate}`);
      setGeneratedPlate(finalPlate);
    });
  }

  useEffect(() => {
    console.log("GENERATE READ FROM URLS YAY");
    const dateParam = searchParams.get("date");
    const dormParam = searchParams.get("dorm");
    const mealParam = searchParams.get("meal");
    if(dateParam !== null) {
      // TODO sanitize input properly
      if(dateParam.length === 10 && dateParam.startsWith("2025-0")) setSelectedDate(dateParam);
    }
    if(mealParam !== null) {
      // TODO sanitize input
      if(["brunch", "dinner"].includes(mealParam)) setSelectedMeal(mealParam);
    }
  }, []);

  useEffect(() => {
    const todayDate = new Date().toJSON().slice(0, 10);
    generateMeal(selectedDate, "maseeh", selectedMeal);
  }, [selectedDate, selectedMeal]);

  return (
    <>
      <div className="u-heading-container">
        <a href="/Maseeh">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="u-backarrow">
            <g>
              <path
                className="u-backarrow-path"
                d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm22.4-63.7H57.6l12.3-15.2c0-2.2-1.8-3.9-3.9-3.9h-7.1L32 64l26.8 25.5H66c2.2 0 3.9-1.8 3.9-3.9L57.1 69.9h28.6c2.2 0 3.9-1.8 3.9-3.9v-4c0-2.1-1-4.4-3.2-4.4z"
              />
            </g>
          </svg>
        </a>
        <div className="u-heading">Maseeh Dining: Generate new balanced meal combinations!</div>
      </div>
      <select className="Maseeh-select" value={selectedMeal} onChange={handleMealChange}>
        {/* <option value="breakfast">Breakfast</option> */}
        <option value="brunch">Brunch</option>
        {/* <option value="lunch">Lunch</option> */}
        <option value="dinner">Dinner</option>
        {/* <option value="late-night">Late Night</option> */}
      </select>
      <select className="Maseeh-select" value={selectedDate} onChange={handleDateChange}>
        <option value={getTodayDateOffset(-1)}>
          {getTodayDateOffset(-1)}
        </option>
        <option value={getTodayDate()}>
          {getTodayDate()} (today)
        </option>
        {[1, 2, 3, 4, 5, 6, 7].map(dayOffset => 
          <option value={getTodayDateOffset(dayOffset)}>
            {getTodayDateOffset(dayOffset)}
          </option>
        )}
      </select>
      <section className="Maseeh-container">
        <div className="Maseeh-grid">
          <div className="Maseeh-plate-wrapper">
            <div className="Maseeh-circle">
              <div className="Maseeh-inner-circle">
                <div className="Maseeh-quarter-circle Maseeh-top-left">
                  <span className="Maseeh-text">Fruits</span>
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
        <p className="Generate-text">
          <b style={{ color: "#f97676" }}>Fruit:</b> {generatedPlate.fruits}
          <br />
          <br />
          <b style={{ color: "#89ba83" }}>Vegetable:</b> {generatedPlate.vegetables}
          <br />
          <br />
          <b style={{ color: "#d9a870" }}>Grain:</b> {generatedPlate.grains}
          <br />
          <br />
          <b style={{ color: "#b499e0" }}>Protein:</b> {generatedPlate.protein}
          <br />
          <br />
          <b style={{ color: "#679cc2" }}>Dairy:</b> {generatedPlate.dairy}
        </p>
      </section>
      <section className="Generate-container">
        <button onClick={() => {generateMeal(selectedDate, "maseeh", selectedMeal)}}>
          Regenerate
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21.986">
            <path d="M19.841 3.24A10.988 10.988 0 0 0 8.54.573l1.266 3.8a7.033 7.033 0 0 1 8.809 9.158L17 11.891v7.092h7l-2.407-2.439A11.049 11.049 0 0 0 19.841 3.24zM1 10.942a11.05 11.05 0 0 0 11.013 11.044 11.114 11.114 0 0 0 3.521-.575l-1.266-3.8a7.035 7.035 0 0 1-8.788-9.22L7 9.891V6.034c.021-.02.038-.044.06-.065L7 5.909V2.982H0l2.482 2.449A10.951 10.951 0 0 0 1 10.942z" />
          </svg>
        </button>
      </section>
    </>
  );
};

export default Generate;

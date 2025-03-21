import React from "react";
import { Link } from "react-router-dom";

import "../../utilities.css";
import "./Home.css";
import "../modules/Plate.css";

const Home = () => {
  return (
    <div className="Home-container">
      <div className="Home-title">🌱 Branch & Bite @ MIT</div>
      <div style={{ width: "80%", margin: "0 auto", textAlign: "center", paddingTop: "10px" }}>
        <p>
          To navigate this site, click on a dining hall of your choice. Here, you'll be able to 
          see what menu items are available in each food group at the current meal time. 
          You also have an option to set dietary restrictions by creating a profile, and
          go to a generate page, where we will randomly select a food combination for you!
        </p>
      </div>
      <div className="Home-dorms-top-row">
        <section className="Home-dorms-container">
          <svg
            viewBox="1390.404442896936 547.9375 70.96011142061282 73.35874"
            className="Home-dorms-outline"
          >
            <path
              d="M1436.39,553.54c-.1-.06-.2-.07-.33-.03-1.47.64-10.31,4.6-12.62,5.72-.26.17-.29.42-.24.72.06.41.28,1.09.51,1.87.4,1.08.4,2.23,1.51,2.54.74.21,1.73-.02,2.39.44.94,1,1.45,3.63,1.84,4.62.19.64-.22.87-.8,1.11-2.58,1.11-9.16,4.41-10.81,4.9-.1-.01-.18-.07-.26-.19-.46-.94-.74-1.99-1.23-3.27-.62-1.44-1.29-4.13-1.99-5.09-.7-.47-1.76.13-2.57.08-.69.03-1.09-.43-1.31-1.03-.22-.6-.39-1.17-.69-1.22-.74.03-1.37.56-2.67,1.06-3.38,1.52-8.89,3.92-10.2,4.56-.72.56-.01,1.44.16,2.31.35.92.16,1.68-.79,1.9-.44.13-.66.49-.46.95.46,1.19,1.93,4.13,2.41,5.33.67,1.26-1.8,1.93-2.42,2.47-.31.22-.38.3-.28.56.89,2.26,11.65,27.24,14.46,33.91.11.17.24.11.43.04,1.75-.73,15.36-6.44,16.82-7.08.23-.12.24-.2.15-.43-.98-2.3-9.58-20.7-10.59-23.27,2.25-1.32,5.15-2.17,8.23-3.58,2.94-1.17,7.18-3.12,9.33-3.84.09,0,.14.06.18.13,2.43,5.32,8.87,20.54,10.02,22.73.08.06.19.06.38,0,2.19-.84,5.34-2.15,7.78-3.12,1.24-.59,2.27-.71,2.49-1.2-.94-2.14-10.99-25.18-14.15-32.19-.23-.45-1.54.82-2.26-.48-.49-.95-.91-2.05-1.34-3.02-.32-.84-.79-1.48-.21-2.17.52-.63,1.77-.98,1.53-1.99-.48-1.21-1.59-3.58-2.35-4.68l-.06-.04Z"
              onClick={() => (window.location.href = "/dorm?dorm=maseeh")}
              className="Home-svg-click"
            />
          </svg>
          <Link to="/dorm?dorm=maseeh" class="Home-link">
            <button className="Home-button Home-link">Maseeh</button>
          </Link>
        </section>

        <section className="Home-dorms-container">
          <svg
            viewBox="1089.6303342618385 447.17 114.50381615598887 83.03241999999999"
            className="Home-dorms-outline"
          >
            <path
              d="M1142.53,500.88c-.38-.9-2.13-2.19-2.64-2.97-.33-.46-.37-.78-.12-1.23,1.95-2.94,7.92-11.51,9.46-13.75.56-.79.88-.54,2.45.31,2.54,1.4,5.51,3.04,8.11,4.47,1.63,1.14,2.37.45,3.98-.49,1.98-1.14,4.24-2.45,6.19-3.56,1.05-.7,1.81-.8,2.07-1.58-.23-1.51-3.44-3.6-3.39-4.82.11-.21.34-.25.6-.3,2.51-.11,3.43-.22,3.3-3.07,0-.41,0-.83.04-1.22-.02-1.76,1.55-2.75,2.89-3.72,1.17-.82,2.24-1.87,3.71-1.71,2.75.07,11,.31,14.44.41,1.3.05,1.79.05,2.68-.78.73-.85,2.74-2.19,1.53-3.29-1.13-.91-4.5-2.91-5.77-3.85-.35-.27-.71-.63-.4-1.06.91-1.34,3.74-2.08,3.81-3.84-.57-1.93-2.43-4.94-3.18-6.5-.22-.36-.26-.56-.49-.66-.38.18-2.05,1.36-4.77,3.15-19.25,13.24-90.38,59.73-93.29,62.77.48.7,1.45,3.24,2.84,3.29,2.56.1,12.97.31,17.75.43,1.93-.03,2.52.37,4.07-.89,2.52-1.78,5.25-3.87,7.76-5.56,1.88-.96,5.2.04,7.29-.03.84.06,1.59-.06,2.14-.72,1.13-1.3,4.26-5.18,5.98-7.25.7-.86,1.14-1.34.99-1.86l-.03-.1Z"
              onClick={() => (window.location.href = "/dorm?dorm=new-vassar")}
              className="Home-svg-click"
            />
          </svg>

          <Link to="/dorm?dorm=new-vassar" className="Home-link">
            <button className="Home-button Home-link">New Vassar</button>
          </Link>
        </section>

        <section className="Home-dorms-container">
          <svg viewBox="235.9 408.51 112.99 75.32" className="Home-dorms-outline">
            <path
              d="M334.33,448.77c4.53-1.81,9.53-4.55,14.06-6.36-2.55-5.31-5.09-10.62-7.64-15.92-6.21,2.98-12.43,5.96-18.64,8.93-1.25-2.33-2.14-3.99-3.4-6.32,1.55-.67,2.61-1.38,3.91-1.96-2.93-6.04-5.87-12.08-8.8-18.13-25.81,11.78-51.62,23.56-77.42,35.35,6,12.99,12,25.98,18,38.97,25.07-10.79,50.15-21.58,75.22-32.37-1.73-3.63-3.25-6.82-4.97-10.44,1.56-.74,2.92-1.52,4.58-2.24,1.74,3.44,3.48,7.41,5.1,10.51ZM274.85,457.55c-2.55-5.31-5.09-10.62-7.64-15.92l23.3-10.23c2.33,5.39,4.66,10.79,6.99,16.18-7.55,3.32-15.11,6.65-22.66,9.97Z"
              onClick={() => (window.location.href = "/dorm?dorm=mccormick")}
              className="Home-svg-click"
            />
          </svg>
          <Link to="/dorm?dorm=mccormick" class="Home-link">
            <button className="Home-button Home-link">McCormick</button>
          </Link>
        </section>

        <section className="Home-dorms-container">
          <svg
            viewBox="1246.8714902506963 632.5822000000001 79.02376044568246 62.87892"
            className="Home-dorms-outline"
          >
            <path
              d="M1319.34,650.16c-1-.94-9.6-7.23-11.94-9.07-.5-.36-.57-.52-.98-.12-.84.74-3.16,3.47-4.21,4.2-.29.08-.45-.11-.72-.32-.66-.53-1.46-1.72-2.25-1.97-.39-.06-.94.54-1.75,1.2-2.1,1.96-2.06,1.53-4.13.24-.42-.23-.62-.34-.91-.08-.75.86-3.79,4.7-5.3,6.56-.84,1-.79,1.2-1.6,1.15-1.49-.09-6.71-.44-7.76-.49-.91.02-1.37.63-2.31,1.08-2.91,1.76-7.33,4.12-9.72,5.71-.32,1.34-.05,3.7-.14,5.17-.01.61-.1.71-.5.91-1.84.88-10.23,4.8-11.06,5.23-.27.19-.2.33-.25.72-.03.4-.09,1.03-.15,1.81-.35,4.32-1.14,13.19-1.17,14.27.1.35.34.39.75.67,1.23.61,3.01,1.93,3.92,2.15.95-1.13,22.01-29.09,23.16-30.52.57-.08,1.1.27,2.12.53.72.23,1.37.41,1.65.56.17.09.28.24.17.44-.52.99-4.47,6.95-5.42,8.75-.01.19.16.27.33.37,1.05.53,5.19,2.56,6.44,3.17.21.1.4.2.58.12,1.16-1.79,2.54-4.98,3.66-7.04.75-1.34.49-1.86,2.24-1.84,1.84-.13,4.15-.29,5.92-.42.55-.05.79-.03,1.07-.44.85-1.22,4.74-6.85,6.19-8.93.64-.89.56-.98,1.11-.73,2.27.96,14.8,6.36,15.68,6.68.06,0,.09-.03.08-.12-.02-.16-.13-.53-.29-1.09-.63-2.16-1.83-6.45-2.47-8.44l-.03-.05Z"
              onClick={() => (window.location.href = "/dorm?dorm=baker")}
              className="Home-svg-click"
            />
          </svg>
          <Link to="/dorm?dorm=baker" className="Home-link">
            <button className="Home-button Home-link">Baker</button>
          </Link>
        </section>

        <section className="Home-dorms-container">
          <svg
            viewBox="876.75 790.58564 90.31286908077995 61.266639999999995"
            className="Home-dorms-outline"
          >
            <path
              d="M951.69,815.34c1.79-.49,4.09-1.87,5.92-2.6.96-.43,1.09-.11,1.78,1.11.75,1.32,1.56,2.77,2.31,4.09.36.64.66,1.16.84,1.51.2.42.28.6-.06.84-1.34.75-8.84,4.65-11.71,6.18-.76.31-1.16.91-1.66.36-1.66-1.81-11.18-12.81-14.84-16.76-2.32.64-17.26,7.69-19.02,8.39-.13.07-.2.14-.22.27-.02.34.2,1.72.45,3.8.7,5.5,1.49,11.78,2.2,17.35.17,1.54.39,1.23-1.01,1.86-5.71,2.5-12.6,5.67-18.12,8-1.53-.95-14.44-14.62-16.52-16.5-.69-.66-2.48-1.64-1.51-2.82.38-.44.48-1.02.17-1.58-.82-1.98-3.2-5.86-3.44-7.27.06-.24.23-.38.46-.54,1.03-.65,4.13-2.47,5.18-3.06.2-.11.46-.22.66-.16,1.07,1.05,4.45,7.25,5.57,8.91.2.32.39.59.78.41,1.52-.73,10.76-5.44,13.16-6.65.69-.35.76-.44.55-1.41-.44-1.96-1.02-4.41-1.48-6.43-.31-1.26-.22-1.41,1.03-1.99,1.66-.77,3.79-1.88,5.39-2.53.37-.12.66-.08.97.14,2.22,2.27,1.73,2.32,4.96.83.7-.32,1.43-.62,2.08-.95,1.11-.52,1.23-1.57,2.03-2.59,1.46-2.06,4.24.13,6.03.3,1.52.04,2.96-.94,4.42-1.39,1.4-.53,1.93-.74,1.58-1.77-.21-1.17-1.5-2.81-.77-3.89,1.18-1.08,3.08-2.7,4.37-3.45.72-.08.88.58,1.79,1.37,1.86,1.91,5.02,5.12,5.98,6.13.9,1,.86,2.49,1.26,3.8.47,1.89.42,3.38,2.16,4.33,1.91,1.25,4.31,3.46,6.2,4.36h.09Z"
              onClick={() => (window.location.href = "/dorm?dorm=next")}
              className="Home-svg-click"
            />
          </svg>
          <Link to="/dorm?dorm=next" className="Home-link">
            <button className="Home-button Home-link">Next</button>
          </Link>
        </section>

        <section className="Home-dorms-container">
          <svg
            viewBox="896.1027576601672 592.2752 88.70013927576602 69.32803999999999"
            className="Home-dorms-outline"
          >
            <polygon
              points="906.76 655.53 900.21 646.12 971.07 598.77 977.96 608.51 906.76 655.53"
              onClick={() => (window.location.href = "/dorm?dorm=simmons")}
              className="Home-svg-click"
            />
          </svg>
          <Link to="/dorm?dorm=simmons">
            <button className="Home-button Home-link">Simmons</button>
          </Link>
        </section>
      </div>

      <div className="u-heading u-heading-container"> About Us </div>
      <div className="Home-about-container">
        <div style={{ width: "30%", minWidth: "300px" }}>
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
        <div className="Plate-grid">
          <div className="Plate-plate-wrapper">
            <div className="Plate-circle">
              <div className="Plate-inner-circle">
                <div className="Plate-quarter-circle Plate-top-left">
                  <span className="Plate-text Plate-text-top-left">Fruits</span>
                </div>
                <div className="Plate-quarter-circle Plate-bottom-left">
                  <span className="Plate-text Plate-text-bottom-left">Vegetables</span>
                </div>
                <div className="Plate-quarter-circle Plate-top-right">
                  <span className="Plate-text Plate-text-top-right">Grains</span>
                </div>
                <div className="Plate-quarter-circle Plate-bottom-right">
                  <span className="Plate-text Plate-text-bottom-right">Protein</span>
                </div>
              </div>
            </div>
          </div>
          <div className="Plate-dairy-circle">
            <div className="Plate-dairy-inner-circle">
              <span className="Plate-text">Dairy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

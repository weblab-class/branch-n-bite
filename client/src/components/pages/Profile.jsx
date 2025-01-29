import React, { useContext, useState, useEffect, Checkbox } from "react";
import { post, get } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { userId, userName, userPicture } = useContext(UserContext);
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [currentBio, setCurrentBio] = useState("I love to eat 😋");
  // includes = diets
  // excludes = allergies
  const [includes, setIncludes] = useState([""]);
  const [excludes, setExcludes] = useState([""]);
  const includesList = ["Vegetarian", "Vegan", "Halal"];
  const excludesList = [
    "Peanut",
    "Tree Nut",
    "Fish",
    "Wheat/Gluten",
    "Milk",
    "Egg",
    "Soy",
    "Sesame",
  ];

  useEffect(() => {
    get("/api/bio", { userid: userId }).then((bio) => {
      setCurrentBio(bio[0].bio);
    });
    console.log("It should be recheckmarking");
    get("/api/includes", { userid: userId }).then((includes) => {
      setIncludes(includes.restrictions);
    });
    get("/api/excludes", { userid: userId }).then((excludes) => {
      setExcludes(excludes.allergies);
    });
  }, [userId]);

  const handlePencilClick = () => {
    setEditingBio((prev) => !prev);
  };

  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  };

  const deleteTextArea = () => {
    document.getElementById("bioTextbox").value = "";
  };

  // const NewBio = (props) => {
  const handleNewBio = () => {
    const body = { userid: userId, content: newBio };
    post("/api/updatedBio", body).then((bio) => {
      setCurrentBio(bio[0]);
      setEditingBio(false);
      // props.addNewBio(bio);
      deleteTextArea();
    });
  };

  const handleIncludes = (restrName) => {
    const newIncludes = [...includes];
    if (!includes.includes(restrName)) {
      newIncludes.push(restrName);
    } else {
      const ind = newIncludes.indexOf(restrName);
      newIncludes.splice(ind, 1);
    }
    const body = { userid: userId, includes: newIncludes };
    setIncludes(newIncludes);
    post("/api/updatedIncludes", body).then(() => {});
  };

  const handleExcludes = (restrName) => {
    const newExcludes = [...excludes];
    if (!excludes.includes(restrName)) {
      newExcludes.push(restrName);
    } else {
      const ind = newExcludes.indexOf(restrName);
      newExcludes.splice(ind, 1);
    }
    console.log(newExcludes);
    const body = { userid: userId, excludes: newExcludes };
    setExcludes(newExcludes);
    post("/api/updatedExcludes", body).then(() => {});
  };

  return (
    <section className="Profile-container">
      <div className="u-heading Profile-title">Profile</div>
      {userId ? (
        <section className="Profile-full-details">
          <section className="Profile-details">
            <img src={userPicture} alt={`${userName}'s profile`} className="Profile-picture" />
            <p className="Profile-name">Welcome, {userName}!</p>
            <section className="Profile-bio-container">
              {editingBio ? (
                <div className="Profile-bio-edit">
                  <textarea
                    id="bioTextbox"
                    value={newBio}
                    onChange={handleBioChange}
                    placeholder="Adding bio . . ."
                    className="Profile-bio-input"
                  />
                  <button onClick={handleNewBio}>Save Bio</button>
                </div>
              ) : (
                <div className="Profile-bio">
                  <span style={{ "font-weight": "500" }}>About Me: </span> {currentBio}
                </div>
              )}
              <svg onClick={handlePencilClick} viewBox="0 0 48 48" className="Profile-pencil">
                <path d="m46.84 5.32-4.16-4.16a4 4 0 0 0-5.58 0C1.7 36.55 3.65 34.52 3.53 34.88S3 36.78 0 46.72A1 1 0 0 0 1 48c.21 0 12.08-3.45 12.39-3.68s-2.75 2.79 33.45-33.42a4 4 0 0 0 0-5.58zM35 6.05 42 13l-1.37 1.37-6.97-6.95zM10.45 38.91l-1-.34-.34-1L35 11.61 36.39 13zm21.8-30.08 1.36 1.37L7.79 36l-1.71-1zM3.32 42.67a7.68 7.68 0 0 1 2 2l-2.85.84zm4 1.42a9.88 9.88 0 0 0-3.43-3.43l1.16-3.94 2 1.23c.88 2.62.38 2.08 2.94 2.94l1.23 2zM13 41.92l-1-1.71 25.8-25.82 1.37 1.36zM45.43 9.49l-2.07 2.07-6.92-6.92 2.07-2.07a1.94 1.94 0 0 1 2.75 0l4.17 4.17a1.94 1.94 0 0 1 0 2.75z" />
              </svg>
            </section>
          </section>
          <div className="Profile-vertical-bar"></div>
          <section className="Profile-preferences-big-container">
            <div className="Profile-preferences-heading">Preferences</div>
            <section className="Profile-preferences-container">
              <br />
              <section className="Profile-preferences-section">
                <div className="Profile-preferences-subheading">Diet</div>
                {includesList.map((restrName) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        label={restrName}
                        checked={includes.includes(restrName)}
                        onChange={() => {
                          handleIncludes(restrName);
                        }}
                      />{" "}
                      {restrName}
                    </div>
                  );
                })}
              </section>
              <section className="Profile-preferences-section">
                <div className="Profile-preferences-subheading">Allergies</div>
                {excludesList.map((restrName) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        label={restrName}
                        checked={excludes.includes(restrName)}
                        onChange={() => {
                          handleExcludes(restrName);
                        }}
                      />{" "}
                      {restrName}
                    </div>
                  );
                })}
              </section>
            </section>
          </section>
        </section>
      ) : (
        <div>
          <p>Please log in to view your profile.</p>
        </div>
      )}
    </section>
  );
};

export default Profile;

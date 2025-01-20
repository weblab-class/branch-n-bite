import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

import NavBar from "./modules/NavBar";

import { UserContext } from "./context/UserContext";
import axios from "axios";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState("");

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registered in the database, and currently logged in.
        setUserId(user._id);
        // Optionally fetch the user's profile picture here if needed
        axios.get(`/api/user/${user._id}/profile-picture`).then((response) => {
          setUserPicture(response.data.pictureUrl);
        });
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserName(decodedCredential.name);
      setUserPicture(decodedCredential.picture);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUserName("");
    setUserPicture("");
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    userName,
    userPicture,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={authContextValue}>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} />
      <Outlet />
    </UserContext.Provider>
  );
};

export default App;

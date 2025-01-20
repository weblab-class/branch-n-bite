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
  const defaultImg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='48' height='48'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z'/%3E%3C/svg%3E";

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user._id);
        setUserName(user.name);
        setUserPicture(user.picture || defaultImg);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    console.log(`Picture link: ${decodedCredential.picture}`);

    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserName(user.name);
      setUserPicture(user.picture || defaultImg);
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

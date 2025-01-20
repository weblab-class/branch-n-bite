import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (response) => {
    // Extract the user's info from the Google response
    const { credential } = response;
    const decodedCredential = JSON.parse(atob(credential.split(".")[1])); // Decode JWT
    setUser({
      id: decodedCredential.sub,
      name: decodedCredential.name,
      picture: decodedCredential.picture,
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Skeleton from "./components/pages/Skeleton";
import Home from "./components/pages/Home";
import Maseeh from "./components/pages/Maseeh";
import Profile from "./components/pages/Profile";
import Generate from "./components/pages/Generate";
import NotFound from "./components/pages/NotFound";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./components/context/UserContext";

const GOOGLE_CLIENT_ID = "28102359689-hls8va0uqvcgj43cop6kg92qbim6c4fo.apps.googleusercontent.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/maseeh" element={<Maseeh />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/generate" element={<Generate />} />
    </Route>
  )
);

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </GoogleOAuthProvider>
);

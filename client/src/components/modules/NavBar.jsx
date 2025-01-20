import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <nav className="NavBar-container">
      {/* <div className="NavBar-title u-inlineBlock"> */}
      <div className="NavBar-linkContainer u-inlineBlock"></div>
      <Link to="/" className="NavBar-link">
        Home
      </Link>
      <Link to="/profile" className="NavBar-link">
        Profile
      </Link>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
      {/* {userId ? (
        <>
          <span>Welcome, User {userId}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button
          onClick={
            () => handleLogin({ credential: "example_token" }) // Replace with actual login flow
          }
        >
          Login
        </button>
      )} */}
      {/* </div> */}
    </nav>
  );
};

export default NavBar;

/////////////////////

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";

// import "./NavBar.css";
// import { UserContext } from "../context/UserContext";

// /**
//  * The navigation bar at the top of all pages. Takes no props.
//  */
// const NavBar = (props) => {
//   const userId = useContext(UserContext);

//   return (
//     <nav className="NavBar-container">
//       <div className="NavBar-title u-inlineBlock">Catbook</div>
//       <div className="NavBar-linkContainer u-inlineBlock">
//         <Link to="/" className="NavBar-link">
//           Home
//         </Link>
//         {userId && (
//           <Link to={`/profile/${userId}`} className="NavBar-link u-inlineBlock">
//             Profile
//           </Link>
//         )}
//         <Link to="/chat/" className="NavBar-link u-inlineBlock">
//           Chat
//         </Link>
//         {userId ? (
//           <button className="NavBar-link NavBar-login u-inlineBlock" onClick={props.handleLogout}>
//             Sign out
//           </button>
//         ) : (
//           <GoogleLogin
//             text="signin_with"
//             onSuccess={props.handleLogin}
//             onFailure={(err) => console.log(err)}
//             containerProps={{ className: "NavBar-link NavBar-login u-inlineBlock" }}
//           />
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

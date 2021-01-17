import React from "react";
import "../styles/Header.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

export default function Header() {
  const auth = useAuth();
  const history = useHistory();

  function logoutClicked(e) {
    auth.logout();
    history.go(0);
  }

  if (auth.user) {
    return (
      <div className="header-grid">
        <div className="header-grid-left">
          {/* <img src="logo.png" alt="logo" className="header-logo" /> */}
          <Link to="/" className="header-name-title">
            MyLink🔗YourLink
          </Link>
        </div>
        <div className="header-grid-right">
          <div className="profile-dropdown">
            <button className="profile-dropdown-button">Profile</button>
            <div className="profile-dropdown-menu">
              {/* <button> */}
              <Link to={`/users/${auth.user["sub"]}`}>My links</Link>
              {/* </button> */}
              {/* <button> */}
              {/* <Link to="/account">My account</Link> */}
              {/* </button> */}
              <span onClick={logoutClicked}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header-grid">
        <div className="header-grid-left">
          {/* <img src="logo.png" alt="logo" className="header-logo" /> */}
          <Link to="/" className="header-name-title">
            MyLink🔗YourLink
          </Link>
        </div>
        <div className="header-grid-right">
          <Link to="/login" className="login-signup-link">
            Login
          </Link>
          <Link to="/signup" className="login-signup-link">
            Sign up
          </Link>
        </div>
      </div>
    );
  }
}

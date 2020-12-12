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
          <Link to="/">MyLinkYourLink</Link>
        </div>
        <div className="header-grid-right">
          <div className="profile-dropdown">
            <button className="profile-dropbtn">Profile</button>
            <div className="profile-dropdown-content">
              <Link to="/account/links">My links</Link>
              <Link to="/account">My account</Link>
              <button onClick={logoutClicked}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header-grid">
        <div className="header-grid-left">
          <Link to="/">MyLinkYourLink</Link>
        </div>
        <div className="header-grid-right">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    );
  }
}

import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
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

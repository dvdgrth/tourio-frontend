import React from "react";
import "../styles/Header.css";

export default function Header() {
  return (
    <div className="header-grid">
      <div className="header-grid-left">
        <a href="/">MyLinkYourLink</a>
      </div>
      <div className="header-grid-right">
        <a href="/">Login</a>
        <a href="/">Sign up</a>
      </div>
    </div>
  );
}

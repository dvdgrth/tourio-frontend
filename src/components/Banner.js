import React from "react";
import "../styles/Banner.css";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="banner">
      <img src="logo.png" alt="logo" className="banner-logo" />
      <h1 className="banner-title">MyLinkYourLink</h1>
      <Link to="/about">
        <h1>Search the web like never before</h1>
        <h2>- powered by humans, not algorithms -</h2>
      </Link>
    </div>
  );
}

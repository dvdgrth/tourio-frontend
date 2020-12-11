import React from "react";
import "../styles/SearchBar.css";

export default function SearchBar() {
  return (
    <div className="search-container">
      <form className="search-form">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          name="q"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <button>
          <img src="search-24px.svg" alt="Search icon"></img>
        </button>
      </form>
    </div>
  );
}

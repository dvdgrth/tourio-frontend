import React, { useState } from "react";
import "../styles/SearchBar.css";
import { useHistory } from "react-router-dom";

export default function SearchBar({ initialValue }) {
  const history = useHistory();
  const [query, setQuery] = useState(initialValue || "");

  function searchFormSubmitted(e) {
    e.preventDefault();
    console.log(e);
    history.push(`/?q=${query}`);
  }

  function queryChanged(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={searchFormSubmitted}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          name="q"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onChange={queryChanged}
          value={query}
        />
        <button>
          <img src="search-24px.svg" alt="Search icon"></img>
        </button>
      </form>
    </div>
  );
}

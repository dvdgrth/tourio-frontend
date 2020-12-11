import SearchBar from "./SearchBar";
import Banner from "./Banner";
import Add from "./Add";
import "../styles/StartPage.css";
import { useLocation } from "react-router-dom";
import StartPageWithSearch from "./StartPageWithSearch";

import React from "react";

export default function StartPage() {
  const location = useLocation();

  if (new URLSearchParams(location.search).get("q")) {
    return <StartPageWithSearch />;
  } else {
    return (
      <div className="startpage-grid">
        <Banner />
        <SearchBar />
        <Add />
      </div>
    );
  }
}

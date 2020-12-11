import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Add from "./Add";
import SearchBar from "./SearchBar";
import ResultTile from "./ResultTile";
import "../styles/StartPageWithSearch.css";

export default function StartPageWithSearch() {
  const [data, setData] = useState();
  const location = useLocation();

  useEffect(() => {
    async function getData(q) {
      const res = await fetch(`http://localhost:4000/tours?q=${q}`);
      const data = await res.json();
      setData(data);
    }
    getData(new URLSearchParams(location.search).get("q"));
  }, [location.search]);

  return (
    <div>
      <div className="searchbar-add-row">
        <SearchBar />
        <Add />
      </div>

      <div className="results-grid">
        {data
          ? data.map((item) => <ResultTile data={item} key={item._id} />)
          : "loading"}
      </div>
    </div>
  );
}

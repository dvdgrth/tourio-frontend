import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Add from "./Add";
import SearchBar from "./SearchBar";
import ResultTile from "./ResultTile";
import "../styles/StartPageWithSearch.css";

export default function StartPageWithSearch() {
  const [data, setData] = useState();
  const location = useLocation();
  const history = useHistory();

  // useEffect(() => {
  //   async function getData(q) {
  //     // const res = await fetch(`http://localhost:4000/tours?q=${q}`);
  //     // const res = await fetch(
  //     //   `https://mylinkyourlink.herokuapp.com/tours?q=${q}`
  //     // );
  //     const res = await fetch(
  //       (process.env.REACT_APP_DEV_SERVER ||
  //         "https://mylinkyourlink.herokuapp.com") + `/tours?q=${q}`
  //     );

  //     const data = await res.json();
  //     setData(data);
  //   }
  //   getData(new URLSearchParams(location.search).get("q"));
  // }, [location.search]);

  useEffect(() => {
    async function getData(q) {
      // const res = await fetch(`http://localhost:4000/tours?q=${q}`);
      // const res = await fetch(
      //   `https://mylinkyourlink.herokuapp.com/tours?q=${q}`
      // );
      const res = await fetch(
        (process.env.REACT_APP_DEV_SERVER ||
          "https://mylinkyourlink.herokuapp.com") + `/tours?q=${q}`
      );

      const data = await res.json();
      setData(data);
    }

    async function getAll() {
      // const res = await fetch(`http://localhost:4000/tours`);
      // const res = await fetch(`https://mylinkyourlink.herokuapp.com/tours`);
      const res = await fetch(
        (process.env.REACT_APP_DEV_SERVER ||
          "https://mylinkyourlink.herokuapp.com") + "/tours"
      );
      const data = await res.json();
      setData(data);
    }

    if (new URLSearchParams(location.search).get("all") === "true") {
      getAll();
    } else {
      getData(new URLSearchParams(location.search).get("q"));
    }
  }, [location.search]);

  // async function getAll(e) {
  //   // const res = await fetch(`http://localhost:4000/tours`);
  //   // const res = await fetch(`https://mylinkyourlink.herokuapp.com/tours`);
  //   const res = await fetch(
  //     (process.env.REACT_APP_DEV_SERVER ||
  //       "https://mylinkyourlink.herokuapp.com") + "/tours"
  //   );
  //   const data = await res.json();
  //   setData(data);
  // }

  function getAll(e) {
    history.push("/?all=true");
  }

  return (
    <div>
      <div className="searchbar-add-row">
        <SearchBar
          initialValue={new URLSearchParams(location.search).get("q")}
        />
        <Add />
      </div>

      <div className="results-grid">
        {data
          ? data.map((item) => <ResultTile data={item} key={item._id} />)
          : "loading"}
        {data && !data.length ? (
          <div>
            <div>No matching results.</div>
            <button onClick={getAll} className="show-all-button">
              Show all available
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

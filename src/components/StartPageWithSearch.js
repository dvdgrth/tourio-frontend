import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Add from "./Add";
import SearchBar from "./SearchBar";
import ResultTile from "./ResultTile";
import "../styles/StartPageWithSearch.css";
import Loading from "./Loading";

export default function StartPageWithSearch() {
  const [data, setData] = useState();
  const location = useLocation();
  const history = useHistory();

  // useEffect(() => {
  //   document.title = "MyLinkYourLink Search";
  //   return () => {
  //     document.title = "MyLinkYourLink";
  //   };
  // }, []);

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
    setData();
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
      document.title = "All - MyLinkYourLink Search";
      getAll();
    } else {
      document.title = `${new URLSearchParams(location.search).get(
        "q"
      )} - MyLinkYourLink Search`;
      getData(new URLSearchParams(location.search).get("q"));
    }

    return () => {
      document.title = "MyLinkYourLink";
    };
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
        {data ? (
          data.map((item) => <ResultTile data={item} key={item._id} />)
        ) : (
          <Loading />
        )}
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

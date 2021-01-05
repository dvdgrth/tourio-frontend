import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Result.css";
import { useAuth } from "../hooks/use-auth";
// import Infobox from "./Infobox";
// import { useFetch } from "../hooks/useFetch";
import RatingWidget from "./RatingWidget";
import RatingPicker from "./RatingPicker";

export default function Result() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [tab, setTab] = useState(-1);

  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 37 || event.keyCode === 38) {
        // left/up arrow
        if (data && tab >= 0) {
          setTab(tab - 1);
        }
      } else if (event.keyCode === 39 || event.keyCode === 40) {
        // right/down arrow
        if (data && tab < data.links.length - 1) {
          setTab(tab + 1);
        }
      }
    },
    [tab, data]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    async function getData(q) {
      // const res = await fetch(
      //   `https://mylinkyourlink.herokuapp.com/tours/${q}`
      // );
      const res = await fetch(
        (process.env.REACT_APP_DEV_SERVER ||
          "https://mylinkyourlink.herokuapp.com") + `/tours/${q}`
      );
      // const res = await fetch(`http://localhost:4000/tours/${q}`);
      const data = await res.json();
      setData(data);
    }
    getData(id);
  }, [id]);

  if (!data) {
    return "loading";
  }

  return (
    <div className="result-container">
      <ResultHeader data={data} setTab={setTab} />
      <div className="result-grid">
        <ResultNav data={data} tab={tab} setTab={setTab} />
        <ResultContent data={data} tab={tab} setTab={setTab} />
      </div>
    </div>
  );
}

function ResultHeader({ data, setTab }) {
  const auth = useAuth();
  const [userRatingValue, setUserRatingValue] = useState();
  // const history = useHistory();
  // const [msg, setMsg] = useState("");
  // const fetcher = useFetch();

  useEffect(() => {
    if (!auth.user || !data) {
      return;
    }
    console.log(data);
    let userRating = data.ratings.find((rating) => {
      if (!rating.author) return false;
      return rating.author._id === auth.user["sub"];
    });
    if (userRating) {
      setUserRatingValue(userRating.value);
    }
  }, [data, auth.user]);

  // async function ratingClicked(e) {
  //   console.log(e.target.dataset.rating);

  //   if (!auth.user) {
  //     setMsg("You must be logged in to vote.");
  //     return;
  //   }

  //   const response = await fetcher.fetchWithToken(
  //     "https://mylinkyourlink.herokuapp.com/tours/ratings",
  //     // "http://localhost:4000/tours/ratings",
  //     {
  //       rating: e.target.dataset.rating,
  //       tour: data._id,
  //     }
  //   );

  //   if (response.ok) {
  //     // const responseBody = await response.json();
  //     // setLoading(false);
  //     history.go(0);
  //   } else {
  //     console.log(response);
  //     const responseBody = await response.json();
  //     // setLoading(false);
  //     setMsg("Rating failed:\n" + JSON.stringify(responseBody));
  //   }
  // }

  return (
    <div className="result-header">
      <h1 className="result-title-clickable" onClick={() => setTab(-1)}>
        {data.title}
      </h1>
      <div className="result-header-grid">
        <div>Author:</div>
        <Link to={`/users/${data.author._id}`}>{data.author.username}</Link>
        <div>Created at:</div>
        <div>{new Date(data.createdAt).toLocaleDateString()}</div>
        <div>Last updated at:</div>
        <div>{new Date(data.updatedAt).toLocaleDateString()}</div>
      </div>
      <div className="rating-container">
        <div className="result-rating-widget">
          <RatingWidget ratings={data.ratings} /> ({data.ratings.length}{" "}
          {data.ratings.length > 1 ? " votes" : " vote"})
        </div>
        <div>Your rating:</div>
        {/* <div className="rating-range">
          <div
            data-rating="1"
            onClick={ratingClicked}
            className={userRatingValue === 1 ? "user-rating-selected" : ""}
          >
            1
          </div>
          <div
            data-rating="2"
            onClick={ratingClicked}
            className={userRatingValue === 2 ? "user-rating-selected" : ""}
          >
            2
          </div>
          <div
            data-rating="3"
            onClick={ratingClicked}
            className={userRatingValue === 3 ? "user-rating-selected" : ""}
          >
            3
          </div>
          <div
            data-rating="4"
            onClick={ratingClicked}
            className={userRatingValue === 4 ? "user-rating-selected" : ""}
          >
            4
          </div>
          <div
            data-rating="5"
            onClick={ratingClicked}
            className={userRatingValue === 5 ? "user-rating-selected" : ""}
          >
            5
          </div>
          <div
            data-rating="6"
            onClick={ratingClicked}
            className={userRatingValue === 6 ? "user-rating-selected" : ""}
          >
            6
          </div>
          <div
            data-rating="7"
            onClick={ratingClicked}
            className={userRatingValue === 7 ? "user-rating-selected" : ""}
          >
            7
          </div>
          <div
            data-rating="8"
            onClick={ratingClicked}
            className={userRatingValue === 8 ? "user-rating-selected" : ""}
          >
            8
          </div>
          <div
            data-rating="9"
            onClick={ratingClicked}
            className={userRatingValue === 9 ? "user-rating-selected" : ""}
          >
            9
          </div>
          <div
            data-rating="10"
            onClick={ratingClicked}
            className={userRatingValue === 10 ? "user-rating-selected" : ""}
          >
            10
          </div>
        </div> */}
        {/* {msg && <Infobox msg={msg} />} */}
        {/* <div>{msg}</div> */}
        <RatingPicker userRatingValue={userRatingValue} tourId={data._id} />
      </div>
    </div>
  );
}

function ResultNav({ data, tab, setTab }) {
  function handleClick(event) {
    setTab(this);
  }

  return (
    <div className="link-grid">
      <div
        className={tab === -1 ? "link-selected" : ""}
        onClick={handleClick.bind(-1)}
      >
        <div className="tour-summary">{data.title}</div>
        <div></div>
      </div>

      {data.links.map((el, i) => (
        <div className={tab === i ? "link-selected" : ""} key={i}>
          <div className="link-name" onClick={handleClick.bind(i)}>
            {el.link}
          </div>
          <a
            href={el.link}
            target="_blank"
            rel="noreferrer"
            className="external-link"
          >
            🡕
          </a>
        </div>
      ))}
    </div>
  );
}

function ResultContent({ data, tab, setTab }) {
  function selectedTabContent() {
    if (tab === -1) {
      return data.summary;
    } else {
      return data.links[tab].description;
    }
  }

  function navPrevClicked(e) {
    setTab(tab - 1);
  }
  function navNextClicked(e) {
    setTab(tab + 1);
  }

  return (
    <div className="result-content-grid">
      <div className="result-content">
        <div>{selectedTabContent()}</div>
        {/* {tab === -1 && (
          <div>
            <RatingWidget ratings={data.ratings} />
          </div>
        )} */}
      </div>
      {tab !== -1 && (
        <a
          href={data.links[tab].link}
          target="_blank"
          rel="noreferrer"
          className="external-link-button"
        >
          {data.links[tab].link}
        </a>
      )}
      <div className="result-nav-container">
        <button
          className="result-nav-button"
          onClick={navPrevClicked}
          disabled={tab <= -1}
        >
          {"<"}
        </button>
        <button
          className="result-nav-button"
          onClick={navNextClicked}
          disabled={tab >= data.links.length - 1}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

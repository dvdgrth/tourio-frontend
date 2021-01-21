import React, { useState } from "react";
import "../styles/RatingPicker.css";
import { useAuth } from "../hooks/use-auth";
import { useFetch } from "../hooks/useFetch";
import Infobox from "./Infobox";
import { useHistory } from "react-router-dom";

export default function RatingPicker({ userRatingValue, tourId }) {
  //   const [userRatingValue, setUserRatingValue] = useState();
  const [mouseOverRating, setMouseOverRating] = useState();
  const auth = useAuth();
  const [msg, setMsg] = useState("");
  const fetcher = useFetch();
  const history = useHistory();

  async function ratingClicked(e) {
    // console.log(e.target.dataset.rating);

    if (!auth.user) {
      setMsg("You must be logged in to vote.");
      return;
    }

    const response = await fetcher.fetchWithToken(
      // "https://mylinkyourlink.herokuapp.com/tours/ratings",
      (process.env.REACT_APP_DEV_SERVER ||
        "https://mylinkyourlink.herokuapp.com") + "/tours/ratings",
      // "http://localhost:4000/tours/ratings",
      {
        rating: e.target.dataset.rating,
        tour: tourId,
      }
    );

    if (response.ok) {
      // const responseBody = await response.json();
      // setLoading(false);
      history.go(0);
    } else {
      try {
        const responseBody = await response.json();
        setMsg("Rating failed: " + JSON.stringify(responseBody));
      } catch (error) {
        setMsg("Rating failed.");
      }
      // console.log(response);
      // const responseBody = await response.json();
      // setLoading(false);
      // setMsg("Rating failed:\n" + JSON.stringify(responseBody));
    }
  }

  function mouseOver(e) {
    // console.log(e.target.dataset.rating);
    setMouseOverRating(e.target.dataset.rating);

    // if (!auth.user) {
    //   setMsg("You must be logged in to vote.");
    //   return;
    // }

    // const response = await fetcher.fetchWithToken(
    //   "http://localhost:4000/tours/ratings",
    //   {
    //     rating: e.target.dataset.rating,
    //     tour: data._id,
    //   }
    // );
  }

  function getClassNames(i) {
    let classNames = "";
    classNames += userRatingValue >= i ? " rating-picker-selected" : "";
    classNames += mouseOverRating >= i ? " rating-picker-mouseover" : "";
    return classNames;
  }

  function mouseLeave(e) {
    setMouseOverRating(false);
  }

  return (
    <div className="rating-picker-container">
      <div className="rating-picker-range" onMouseLeave={mouseLeave}>
        <div
          data-rating="1"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(1)}
        ></div>
        <div
          data-rating="2"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(2)}
        ></div>
        <div
          data-rating="3"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(3)}
        ></div>
        <div
          data-rating="4"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(4)}
        ></div>
        <div
          data-rating="5"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(5)}
        ></div>
        <div
          data-rating="6"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(6)}
        ></div>
        <div
          data-rating="7"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(7)}
        ></div>
        <div
          data-rating="8"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(8)}
        ></div>
        <div
          data-rating="9"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(9)}
        ></div>
        <div
          data-rating="10"
          onClick={ratingClicked}
          onMouseOver={mouseOver}
          className={getClassNames(10)}
        ></div>
      </div>
      <div>{msg ? <Infobox msg={msg} /> : <div></div>}</div>
      {/* <div>{msg ? msg : "test"}</div> */}
    </div>
  );
}

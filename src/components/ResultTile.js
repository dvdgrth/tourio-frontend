import React from "react";
import { Link } from "react-router-dom";
import "../styles/ResultTile.css";
import RatingWidget from "./RatingWidget";

export default function ResultTile({ data }) {
  // function calculateRating(ratings) {
  //   if (!ratings.length) {
  //     return "none";
  //   }
  //   let sum = ratings.reduce((acc, rating) => {
  //     return acc + rating.value;
  //   }, 0);
  //   return Math.round((sum / ratings.length) * 10) / 10;
  // }

  return (
    <Link to={`/tours/${data._id}`} style={{ textDecoration: "none" }}>
      <div className="result-tile-grid">
        <div className="result-linkcount">
          {data.links.length}
          {data.links.length > 1 ? " Links" : " Link"}
        </div>
        <div className="result-date">
          {new Date(data.updatedAt).toLocaleDateString()}
        </div>
        <h2 className="result-title">{data.title}</h2>
        <div>{data.summary}</div>

        <div className="result-tile-rating">
          {/* Rating: {calculateRating(data.ratings)} */}
          <RatingWidget ratings={data.ratings} />
          <div className="result-tile-rating-votes">
            ({data.ratings.length} votes)
          </div>
        </div>
      </div>
    </Link>
  );
}

import React from "react";
import "../styles/RatingWidget.css";

export default function RatingWidget({ ratings }) {
  function calculateRating(ratings) {
    if (!ratings) {
      return "-";
    }
    if (!ratings.length) {
      return "-";
    }
    let sum = ratings.reduce((acc, rating) => {
      return acc + rating.value;
    }, 0);
    return Math.round((sum / ratings.length) * 10) / 10;
  }

  return <div className="rating-widget">{calculateRating(ratings)}/10</div>;
}

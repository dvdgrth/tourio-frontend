import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/ResultTile.css";
import RatingWidget from "./RatingWidget";

// export default function ResultTile({ data }) {
//   // function calculateRating(ratings) {
//   //   if (!ratings.length) {
//   //     return "none";
//   //   }
//   //   let sum = ratings.reduce((acc, rating) => {
//   //     return acc + rating.value;
//   //   }, 0);
//   //   return Math.round((sum / ratings.length) * 10) / 10;
//   // }

//   return (
//     // <Link to={`/tours/${data._id}`} style={{ textDecoration: "none" }}>
//     <div className="result-tile-grid">
//       <div className="result-linkcount">
//         {data.links.length}
//         {data.links.length > 1 ? " Links" : " Link"}
//       </div>
//       <div className="result-date">
//         {new Date(data.updatedAt).toLocaleDateString()}
//       </div>
//       <div className="result-tile-author-name">
//         <Link to={`/users/${data.author._id}`}>{data.author.username}</Link>
//       </div>
//       <h2 className="result-title">{data.title}</h2>
//       <div>{data.summary}</div>

//       <div className="result-tile-rating">
//         {/* Rating: {calculateRating(data.ratings)} */}
//         <RatingWidget ratings={data.ratings} />
//         <div className="result-tile-rating-votes">
//           ({data.ratings.length} votes)
//         </div>
//       </div>
//     </div>
//     // {/* </Link> */}
//   );
// }

export default function ResultTile({ data }) {
  const history = useHistory();

  function tileClicked(e) {
    // console.log(e.target.tagName);
    if (e.target.tagName === "A") {
      history.push(`/users/${data.author._id}`);
    } else {
      history.push(`/tours/${data._id}`);
    }
  }

  return (
    // <Link to={`/tours/${data._id}`} style={{ textDecoration: "none" }}>
    <div className="result-tile-grid" onClick={tileClicked}>
      <div className="result-linkcount">
        {data.links.length}
        {data.links.length > 1 ? " Links" : " Link"}
      </div>
      <div className="result-date">
        {new Date(data.updatedAt).toLocaleDateString()}
      </div>
      <div className="result-tile-author-name">
        <Link to={`/users/${data.author._id}`}>{data.author.username}</Link>
      </div>
      <h2 className="result-title">{data.title}</h2>
      <div className="result-summary">{data.summary}</div>

      <div className="result-tile-rating">
        {/* Rating: {calculateRating(data.ratings)} */}
        <RatingWidget ratings={data.ratings} />
        <div className="result-tile-rating-votes">
          ({data.ratings.length} votes)
        </div>
      </div>
    </div>
    // </Link>
  );
}

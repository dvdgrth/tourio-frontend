import React from "react";
import { Link } from "react-router-dom";
import "../styles/ResultTile.css";

export default function ResultTile({ data }) {
  return (
    <Link to={`/tours/${data._id}`} style={{ textDecoration: "none" }}>
      <div className="result-tile-grid">
        <h2 className="result-title">{data.title}</h2>
        <div className="result-date">
          {new Date(data.created).toLocaleDateString()}
        </div>
        <div>{data.summary}</div>
        <div className="result-linkcount">{data.links.length} Links</div>
      </div>
    </Link>
  );
}

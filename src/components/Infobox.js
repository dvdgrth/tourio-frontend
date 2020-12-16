import React from "react";
import "../styles/Infobox.css";

export default function Infobox({ msg }) {
  return <div className="infobox">⚠️ {msg} ⚠️</div>;
}

import React, { useState } from "react";
import "../styles/Add.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

export default function Add() {
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const auth = useAuth();

  function addButtonClicked(e) {
    if (auth.user) {
      setModal(false);
      history.push("/new");
    } else {
      setModal(true);
    }
  }

  return (
    <div className="add-container">
      <button onClick={addButtonClicked}>+ add links</button>
      {modal && <div>You must be logged in to add links</div>}
    </div>
  );
}

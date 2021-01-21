import React, { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";
import { Link } from "react-router-dom";
import "../styles/New.css";

export default function New() {
  const auth = useAuth();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [links, setLinks] = useState([{ link: "", description: "" }]);

  async function addFormSubmitted(e) {
    e.preventDefault();
    let token = auth.token;
    if (!token) {
      // console.log("need to refresh token...");
      token = await auth.refresh();
      if (!token) {
        // console.log("refresh failed");
        //TODO: probably retry or logout/ask to login again
        auth.logout();
        return;
      }
      // console.log("refresh successful, new token:");
      // console.log(token);
    }
    let data = {
      title: title,
      // author: auth.user["sub"],
      summary: summary,
      links: links,
    };
    try {
      // const response = await fetch("http://localhost:4000/tours", {
      const response = await fetch(
        // "https://mylinkyourlink.herokuapp.com/tours",
        (process.env.REACT_APP_DEV_SERVER ||
          "https://mylinkyourlink.herokuapp.com") + "/tours",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + auth.token,
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(data),
        }
      );
      const responseText = await response.text();
      if (response.ok) {
        // console.log("success");
        // console.log(responseText);
        // history
      } else {
        // Try refreshing the token
        // console.log("need to refresh token...");
        token = await auth.refresh();
        if (!token) {
          // console.log("failed");
          // console.log(responseText);
        } else {
          // try one more
          const response = await fetch("http://localhost:4000/tours", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: "Bearer " + auth.token,
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(data),
          });
          // const responseText = await response.text();
          if (response.ok) {
            // console.log("success");
            // console.log(responseText);
          } else {
            // console.log("failed");
            // console.log(responseText);
          }
        }
      }
    } catch (error) {
      // console.log(error);
      return;
    }
  }

  function titleChanged(e) {
    setTitle(e.target.value);
  }
  function summaryChanged(e) {
    setSummary(e.target.value);
  }

  function handleChange(event) {
    let l = [...links];
    if (event.target.name === "link") {
      l[this].link = event.target.value;
    }
    if (event.target.name === "description") {
      l[this].description = event.target.value;
    }
    setLinks(l);
  }

  const addClick = () => {
    setLinks([...links, { link: "", description: "" }]);
  };

  function removeClick() {
    let l = [...links];
    l.splice(this, 1);
    setLinks(l);
  }

  function createInputs() {
    return links.map((el, i) => (
      <div key={i} className="new-link-section">
        <div className="new-index-section">
          <b>{i + 1}</b>
        </div>
        <label className="new-link-label">
          <b>Link</b>
        </label>
        <input
          type="text"
          value={el.link || ""}
          onChange={handleChange.bind(i)}
          name="link"
          placeholder="Add the link here..."
          className="new-link-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <label className="new-description-label">
          <b>Description</b>
        </label>
        <textarea
          // type="text"
          value={el.description || ""}
          onChange={handleChange.bind(i)}
          name="description"
          placeholder="Describe the link here..."
          className="new-description-textarea"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {/* <input
          type="button"
          value="remove this link"
          onClick={removeClick.bind(i)}
          className="new-remove-input"
        /> */}
        <div className="new-remove-x" onClick={removeClick.bind(i)}>
          x
        </div>
      </div>
    ));
  }

  if (!auth.user) {
    return (
      <div>
        <h1>Add a new entry</h1>
        <div>You must be logged in to add new links.</div>
        <Link to="/login">Login</Link>
      </div>
    );
  } else {
    return (
      <div className="new-container">
        <div>
          <h1>Add a new entry</h1>
          <form onSubmit={addFormSubmitted} className="new-grid">
            <label htmlFor="title">
              <b>Title</b>
            </label>
            <input
              placeholder="Title"
              onChange={titleChanged}
              value={title}
              name="title"
              className="new-title-input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />

            <label htmlFor="summary">
              <b>Summary</b>
            </label>
            <textarea
              placeholder="Summary"
              onChange={summaryChanged}
              value={summary}
              name="summary"
              className="new-summary-textarea"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />

            {createInputs()}
            <input
              type="button"
              value="+ add more links"
              onClick={addClick}
              className="new-add-link-button"
            />
            <button type="submit" className="new-add-submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

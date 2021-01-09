import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth.js";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../styles/New.css";
import { useFetch } from "../hooks/useFetch.js";
import Infobox from "./Infobox.js";
import Modal from "react-modal";

export default function New() {
  const auth = useAuth();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [links, setLinks] = useState([
    { link: "", description: "", error: false },
  ]);
  const fetcher = useFetch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const location = useLocation();
  const [data, setData] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement("#root");

  useEffect(() => {
    if (location.state && location.state.data) {
      console.log(location.state.data);
      setData(true);
      setTitle(location.state.data.title);
      setSummary(location.state.data.summary);
      setLinks(location.state.data.links);
    } else {
      console.log("no data");
      setData(false);
    }
  }, [location.state]);

  async function addFormSubmitted(e) {
    e.preventDefault();

    if (links.find((link) => link.error)) {
      setMsg("Some links are not valid.");
      // console.log("Links are not valid.");
      return;
    }

    setLoading(true);

    // let edit = false
    // if (location.state && location.state.data && location.state.data._id) {
    //   edit = true
    // }

    // let response = await fetcher.fetchWithToken("http://localhost:4000/tours", {
    let response = await fetcher.fetchWithToken(
      // "https://mylinkyourlink.herokuapp.com/tours",

      (process.env.REACT_APP_DEV_SERVER ||
        "https://mylinkyourlink.herokuapp.com") +
        "/tours" +
        (data ? `/${location.state.data._id}` : ""),
      {
        title: title,
        author: auth.user["sub"],
        summary: summary,
        links: links,
      },
      data ? "PUT" : "POST"
    );
    if (response.ok) {
      const responseBody = await response.json();
      const id = responseBody._id;
      setLoading(false);
      history.push(`/tours/${id}`);
    } else {
      // console.log(response);
      // let responseBody;
      // try {
      //   responseBody = await response.json();
      // } catch (error) {
      //   responseBody = await response.statusText;
      // }

      setLoading(false);
      // setMsg("Submit failed:\n" + JSON.stringify(responseBody));
      setMsg("Submit failed:\n");
    }
  }

  function titleChanged(e) {
    setMsg("");
    setTitle(e.target.value);
  }
  function summaryChanged(e) {
    setMsg("");
    setSummary(e.target.value);
  }

  function handleChange(event) {
    setMsg("");
    let l = [...links];
    if (event.target.name === "link") {
      l[this].link = event.target.value;
      if (
        !event.target.value.startsWith("http://") &&
        !event.target.value.startsWith("https://") &&
        event.target.value
      ) {
        l[this].error = true;
      } else {
        l[this].error = false;
      }
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

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function deleteClicked(e) {
    if (!data) {
      return;
    }
    let response = await fetcher.fetchWithToken(
      (process.env.REACT_APP_DEV_SERVER ||
        "https://mylinkyourlink.herokuapp.com") +
        "/tours" +
        `/${location.state.data._id}`,
      {},
      "DELETE"
    );
    if (response.ok) {
      // const responseBody = await response.json();
      // const id = responseBody._id;
      setLoading(false);
      history.push(`/`);
    } else {
      setLoading(false);
      setMsg("Submit failed:\n");
    }
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
        {el.error && <Infobox msg="Link must begin with http:// or https://" />}
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
          {/* <h1>Add a new entry</h1> */}
          <h1>{data ? "Edit entry" : "Add a new entry"}</h1>
          {data ? (
            <button className="new-delete-button" onClick={openModal}>
              Delete this entry
            </button>
          ) : (
            ""
          )}
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2>Delete this entry?</h2>
            <p>
              This cannot be undone. <br />
              Entry will be deleted permanently.
            </p>
            <div className="new-modal-button-grid">
              <button onClick={closeModal}>No, cancel</button>
              <button onClick={deleteClicked}>Yes, delete</button>
            </div>
          </Modal>
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
            <button
              type="submit"
              className="new-add-submit-button"
              disabled={loading}
            >
              {loading ? "loading..." : "Submit"}
            </button>
          </form>
          {msg && <Infobox msg={msg} />}
        </div>
      </div>
    );
  }
}

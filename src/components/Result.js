import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Result.css";

export default function Result() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [tab, setTab] = useState(-1);

  useEffect(() => {
    async function getData(q) {
      const res = await fetch(`http://localhost:4000/tours/${q}`);
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
        <ResultContent data={data} tab={tab} />
      </div>
    </div>
  );
}

function ResultHeader({ data, setTab }) {
  return (
    <div className="result-header">
      <h1 className="result-title-clickable" onClick={() => setTab(-1)}>
        {data.title}
      </h1>
      <div className="result-header-grid">
        <div>Author:</div>
        <Link to={`/users/${data.author._id}`}>{data.author.username}</Link>
        <div>Created at:</div>
        <div>{new Date(data.created).toLocaleDateString()}</div>
        <div>Last Updated at:</div>
        <div>{new Date(data.lastUpdated).toLocaleDateString()}</div>
        <div>Rating:</div>
        <div>{JSON.stringify(data.ratings)}</div>
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
        className={tab === -1 && "link-selected"}
        onClick={handleClick.bind(-1)}
      >
        <div className="tour-summary">{data.title}</div>
        <div></div>
      </div>

      {data.links.map((el, i) => (
        <div className={tab === i && "link-selected"}>
          <div className="link-name" key={i} onClick={handleClick.bind(i)}>
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

function ResultContent({ data, tab }) {
  function selectedTabContent() {
    if (tab === -1) {
      return data.summary;
    } else {
      return data.links[tab].description;
    }
  }

  return <div className="result-content-grid">{selectedTabContent()}</div>;
}

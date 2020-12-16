import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultTile from "./ResultTile";
import "../styles/User.css";

export default function User() {
  const [user, setUser] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getUser(q) {
      const res = await fetch(`http://localhost:4000/users/${q}`);
      const resJson = await res.json();
      console.log(resJson);
      if (res.ok) {
        setUser(resJson);
      }
    }
    getUser(id);
  }, [id]);

  if (!user) {
    return "User not available";
  }

  return (
    <div>
      <h1>Name: {user.username}</h1>
      <h2>Id: {user._id}</h2>

      <h2>All links from user:</h2>
      <div className="user-links-grid">
        {user.links &&
          user.links.map((link) => (
            // <div>
            //   <h3>
            //     <Link to={`/tours/${link._id}`}> {link.title}</Link>
            //   </h3>
            //   <div>{link.summary}</div>
            // </div>
            <ResultTile data={link} key={link._id} />
          ))}
      </div>
    </div>
  );
}

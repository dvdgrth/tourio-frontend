import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function StartPageWithSearch() {
  const [data, setData] = useState();
  const location = useLocation();

  useEffect(() => {
    async function getData(q) {
      const res = await fetch(`http://localhost:4000/tours?q=${q}`);
      const data = await res.json();
      setData(data);
    }
    getData(new URLSearchParams(location.search).get("q"));
  }, [location.search]);

  return <div>{data ? JSON.stringify(data) : "loading"}</div>;
}

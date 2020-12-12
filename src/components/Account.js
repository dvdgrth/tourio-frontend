import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

export default function Account() {
  const auth = useAuth();

  async function refreshButtonClicked() {
    auth.refresh();
  }

  if (!auth.user) {
    return (
      <div>
        Please <Link to="/login">login</Link> to view your account.
      </div>
    );
  } else {
    return (
      <div>
        <div>{JSON.stringify(auth.user)}</div>
        <div>Token: {auth.token ? auth.token : "not available"}</div>
        <button onClick={refreshButtonClicked}>Refresh token</button>
      </div>
    );
  }
}

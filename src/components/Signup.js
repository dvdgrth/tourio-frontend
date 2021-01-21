import React, { useState } from "react";
import "../styles/Signup.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import Infobox from "./Infobox";
import Loading from "./Loading";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [finished, setFinished] = useState(false);
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  function usernameChanged(e) {
    setUsername(e.target.value);
  }

  function passwordChanged(e) {
    setPassword(e.target.value);
  }

  function emailChanged(e) {
    setEmail(e.target.value);
  }

  async function signupFormSubmitted(e) {
    setLoading(true);
    e.preventDefault();
    setMessage("");

    try {
      const res = await auth.signup(username, password, email);
      // console.log(res);
      if (res.success) {
        setLoading(false);
        setMessage("Signup was successful! Please go to login now.");
        setFinished(true);
      } else {
        setLoading(false);
        // console.log("Signup failed");
        res.res.error
          ? setMessage(res.res.error)
          : setMessage("Signup failed.");
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  }

  if (finished) {
    return (
      <div className="signup-container">
        <div>
          <div>🥳</div>
          <div>Signup was successful!</div>
          Please
          <button>
            <Link to="/login">Login</Link>
          </button>
          now.
        </div>
      </div>
    );
  } else {
    return (
      <div className="signup-container">
        <form className="signup-grid" onSubmit={signupFormSubmitted}>
          <h1>Sign up</h1>
          <div>
            <Infobox
              msg={
                "This site is a prototype under construction. You don't have to use a real email address, just make one up, we don't use it anyway."
              }
            />
          </div>

          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required
            value={username}
            onChange={usernameChanged}
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={password}
            onChange={passwordChanged}
          />

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            required
            value={email}
            onChange={emailChanged}
          />

          {/* <button type="submit">Sign up</button> */}
          <button disabled={loading} type="submit">
            {loading ? <Loading /> : "Sign up"}
          </button>
          {/* {message && <div>{message}</div>} */}
          <div>{message && <Infobox msg={message} />}</div>
        </form>
      </div>
    );
  }
}

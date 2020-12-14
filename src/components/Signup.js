import React, { useState } from "react";
import "../styles/Signup.css";
// import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const auth = useAuth();

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
    e.preventDefault();
    setMessage("");

    try {
      if (await auth.signup(username, password, email)) {
        setMessage("Signup was successful! Please go to login now.");
      } else {
        console.log("Signup failed");
        setMessage("Signup failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-grid" onSubmit={signupFormSubmitted}>
        <h1>Sign up</h1>
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

        <button type="submit">Sign up</button>
        {message && <div>{message}</div>}
      </form>
    </div>
  );
}

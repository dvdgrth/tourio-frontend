import React, { useState } from "react";
import "../styles/Login.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import Infobox from "./Infobox";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const auth = useAuth();

  function usernameChanged(e) {
    setUsername(e.target.value);
  }

  function passwordChanged(e) {
    setPassword(e.target.value);
  }

  async function loginFormSubmitted(e) {
    e.preventDefault();
    setMessage("");

    try {
      if (await auth.login(username, password)) {
        history.goBack();
      } else {
        console.log("Login failed");
        setMessage("Login failed");
      }
      // const response = await fetch("http://localhost:4000/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     username: username,
      //     password: password,
      //   }),
      // });
      // if (response.ok) {
      //   const t = await response.text();
      //   setToken(t);
      //   const decodedToken = jwt.decode(t);
      //   setUser(decodedToken);
      //   localStorage.setItem("user", JSON.stringify(decodedToken));
      //   // localStorage.setItem("username", decodedToken.name);
      //   // localStorage.setItem("id", decodedToken.sub);
      //   history.goBack();
      // } else {
      //   console.log("Login failed");
      //   setMessage("Login failed");
      // }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-container">
      <form className="login-grid" onSubmit={loginFormSubmitted}>
        <h1>Login</h1>
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

        <button type="submit">Login</button>
        {/* {message && <div>{message}</div>} */}
        {message && <Infobox msg={message} />}
      </form>
    </div>
  );
}

import React, { useState, useContext, createContext, useEffect } from "react";
import jwt from "jsonwebtoken";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // useEffect(() => {}, [token]);

  useEffect(() => {
    if (!user && localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user, setUser]);

  // const user = useCallback(() => {
  //   if (user) {
  //     return user;
  //   } else if (localStorage.getItem("user")) {
  //     setUser(JSON.parse(localStorage.getItem("user")));
  //     return JSON.parse(localStorage.getItem("user"));
  //   } else {
  //     return false;
  //   }
  // }, [user]);

  // const user = () => {
  //   return user;
  //   // if (user) {
  //   //   return user;
  //   // } else if (localStorage.getItem("user")) {
  //   //   setUser(JSON.parse(localStorage.getItem("user")));
  //   //   return JSON.parse(localStorage.getItem("user"));
  //   // } else {
  //   //   return false;
  //   // }
  // };

  const signup = async (username, password, email) => {
    try {
      const response = await fetch(
        "https://mylinkyourlink.herokuapp.com/signup",
        {
          // const response = await fetch("http://localhost:4000/signup", {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
        }
      );
      if (response.ok) {
        const r = await response.json();
        console.log(r);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(
        "https://mylinkyourlink.herokuapp.com/login",
        {
          // const response = await fetch("http://localhost:4000/login", {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      if (response.ok) {
        let t = await response.json();
        t = t.token;
        setToken(t);
        const decodedToken = jwt.decode(t);
        setUser(decodedToken);
        localStorage.setItem("user", JSON.stringify(decodedToken));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const refresh = async () => {
    try {
      // const res = await fetch(`http://localhost:4000/refresh`, {
      const res = await fetch(`https://mylinkyourlink.herokuapp.com/refresh`, {
        method: "POST",
        credentials: "include",
      });
      console.log(res);
      let newToken;
      if (res.ok) {
        newToken = await res.json();
        newToken = newToken.token;
        console.log(JSON.stringify(newToken));
        console.log(newToken);
        setToken(newToken);
        return newToken;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
  };

  return {
    user,
    token,
    signup,
    login,
    refresh,
    logout,
  };
}

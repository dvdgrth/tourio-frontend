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
      const response = await fetch("http://localhost:4000/signup", {
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
      });
      if (response.ok) {
        const r = await response.text();
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
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const t = await response.text();
        setToken(t);
        const decodedToken = jwt.decode(t);
        setUser(decodedToken);
        localStorage.setItem("user", JSON.stringify(decodedToken));
        await new Promise((r) => setTimeout(r, 1));
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
      const res = await fetch(`http://localhost:4000/refresh`, {
        credentials: "include",
      });
      let newToken;
      if (res.ok) {
        newToken = await res.text();
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

  // useEffect(() => {
  //   const unsubscribe = () => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(false);
  //     }
  //   };
  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, [user]);

  // // Wrap any Firebase methods we want to use making sure ...
  // // ... to save the user to state.
  // const signin = (email, password) => {
  //   return firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((response) => {
  //       setUser(response.user);
  //       return response.user;
  //     });
  // };

  // const signup = (email, password) => {
  //   return firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((response) => {
  //       setUser(response.user);
  //       return response.user;
  //     });
  // };

  // const signout = () => {
  //   return firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       setUser(false);
  //     });
  // };

  // const sendPasswordResetEmail = (email) => {
  //   return firebase
  //     .auth()
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // const confirmPasswordReset = (code, password) => {
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(code, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // // Subscribe to user on mount
  // // Because this sets state in the callback it will cause any ...
  // // ... component that utilizes this hook to re-render with the ...
  // // ... latest auth object.
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(false);
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  // Return the user object and auth methods
  return {
    user,
    token,
    signup,
    login,
    refresh,
    logout,
  };
}

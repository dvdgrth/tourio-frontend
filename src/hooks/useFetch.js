import { useAuth } from "./use-auth";

export function useFetch() {
  const auth = useAuth();
  let token = auth.token;

  const fetchWithToken = async (url, data, method = "POST") => {
    if (!token) {
      console.log("need to refresh token...");
      token = await auth.refresh();
      if (!token) {
        console.log("refresh failed");
        //TODO: probably retry or logout/ask to login again
        return token;
      }
      console.log("refresh successful, new token:");
      console.log(token);
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });
      // const responseText = await response.text();
      if (response.ok) {
        console.log("success");
        console.log(response);
        return response;

        // history
      } else {
        // Try refreshing the token
        console.log("try refreshing the token...");
        token = await auth.refresh();
        if (!token) {
          console.log("failed");
          console.log(response);
          return response;
        } else {
          // try once more
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(data),
          });
          // const responseText = await response.text();
          if (response.ok) {
            console.log("success");
            console.log(response);
            return response;
          } else {
            console.log("failed");
            console.log(response);
            return response;
          }
        }
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return { fetchWithToken };
}

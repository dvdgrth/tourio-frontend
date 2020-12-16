// import logo from "./logo.svg";
// import "./App.css";
// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("http://localhost:4000/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             username: "a",
//             password: "a",
//           }),
//         });
//         console.log(response);
//         console.log(response.headers);
//         if (response.ok) {
//           let token = await response.text();
//           console.log(token);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     async function fetchData2() {
//       try {
//         const response = await fetch("http://localhost:4000/refresh", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           // body: JSON.stringify({
//           //   username: "a",
//           //   password: "a",
//           // }),
//         });
//         console.log(response);
//         console.log(response.headers);
//         if (response.ok) {
//           let token = await response.text();
//           console.log(token);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     fetchData2();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import "../styles/App.css";
import Footer from "./Footer";
import Header from "./Header";
import StartPage from "./StartPage";
import Result from "./Result";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Account from "./Account.js";
import Signup from "./Signup";
import New from "./New";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/about">
            <div>about</div>
          </Route>
          <Route path="/impressum">
            <div>impressum</div>
          </Route>
          <Route path="/tours/:id">
            <Result />
          </Route>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/">
            <StartPage />
          </Route>
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

import "../styles/App.css";
import Footer from "./Footer";
import Header from "./Header";
import StartPage from "./StartPage";
import Result from "./Result";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route path="/about">
            <div>about</div>
          </Route>
          <Route path="/impressum">
            <div>impressum</div>
          </Route>
          <Route path="/tours/:id">
            <Result />
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

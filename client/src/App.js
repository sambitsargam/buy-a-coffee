import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Register from "./Register";
import Student from "./Student";
import Institute from "./Institute";

import "./assets/scss/style.scss";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/student" exact component={Student} />
          <Route path="/institute" exact component={Institute} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

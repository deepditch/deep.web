import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "../pages/index";
import Register from "../pages/register";

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Index} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </main>
    );
  }
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("react-container")
);

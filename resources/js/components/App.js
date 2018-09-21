import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Map from "./Map";

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/map" component={Map} />
          <Redirect from="/" to="/login" />
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

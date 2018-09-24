import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import createContainer from '../container/create-container';

class App extends Component {
  render() {
    var c = createContainer();

    return (
      <main>
        <Switch>
          <Route exact path="/login" component={c.Login} />
          <Route exact path="/register" component={c.Register} />
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

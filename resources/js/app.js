import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "reducers";
import { history } from "./history";

import { Router, Route, Switch, Redirect } from "react-router-dom";

import createContainer from "container/create-container";

const store = createStore(rootReducer);
var c = createContainer();

class App extends Component {
  render() {
    return (
      <main>
        <c.Notify />
        <Switch>
          <Route path="/login" component={c.Login} />
          <Route path="/register" component={c.Register} />
          <c.AuthorizedRoute exact path="/" component={c.Map} />
          <Redirect to="/" />
        </Switch>
      </main>
    );
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("react-container")
);

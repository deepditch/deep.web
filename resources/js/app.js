import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "reducers";
import { history } from "./history";

import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap';

import createContainer from "container/create-container";

const store = createStore(rootReducer);
var c = createContainer();

class App extends Component {
  constructor(props) {
    super(props);
    this.isLoggedin = this.isLoggedIn.bind(this);
  }

  isLoggedIn() {
  }

  render() {
    return (
      <main>
        <div class="app-container h-100">
          <c.Notify />
          <Switch>
            <Route path="/login" component={c.Login} />
            <Route path="/register" component={c.Register} />
            <c.AuthorizedRoute exact path="/" component={c.Map} />
            <c.AuthorizedRoute exact path="/damage" component={c.Map} />
            <c.AuthorizedRoute exact path="/users" component={c.Users} />
            <Redirect to="/login" />
          </Switch>
        </div>
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

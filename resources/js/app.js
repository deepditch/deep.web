import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "reducers";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import createContainer from "container/create-container";

const store = createStore(rootReducer);
var c = createContainer();

class App extends Component {
  render() {
    return (
      <main>
        <c.Notify />
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
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("react-container")
);

import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "reducers";
import { history } from "./history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import createContainer from "container/create-container";
import Header from "./components/Header";
import { AuthMiddleware, RedirectMiddleware } from "./middleware";
import "@fortawesome/fontawesome-free";

var c = createContainer();
const store = createStore(rootReducer, applyMiddleware(AuthMiddleware, RedirectMiddleware));

class App extends Component {
  render() {
    return (
      <main>
        <div class="app-container h-100">
          <c.Notify />
          <Switch>
            <Route path="/login" component={c.Login} />
            <Route path="/register/:token" component={c.Register} />
            <Route path="/register" component={c.Register} />
            <c.AuthorizedRoute
              path="/"
              component={() => (
                <>
                  <Header />
                  <Switch>
                    <c.AuthorizedRoute path="/damage" component={c.Map} />
                    <c.AuthorizedRoute path="/users" component={c.Users} />
                    <c.AuthorizedRoute path="/api-tokens" component={c.ApiTokens} />
                    <c.AuthorizedRoute path="/logout" component={c.Logout} />
                    <c.AuthorizedRoute path="/" component={c.Map} />
                  </Switch>
                </>
              )}
            />
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

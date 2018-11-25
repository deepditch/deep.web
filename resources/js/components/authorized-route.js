import React from "react";
import { Route, Redirect } from "react-router-dom";

//https://tylermcginnis.com/react-router-protected-routes-authentication/
export default function AuthorizedRoute({ component: Component, loggedIn, ...rest }) {
  console.log('sdafsad');
  console.log(loggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

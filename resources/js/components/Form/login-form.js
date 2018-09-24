import React, { Component } from "react";
import InputGroup from "./input-group";
import { Link } from "react-router-dom";

/*
 * Form for logging into a user account
 */
export default AuthService =>
  class LoginForm extends Component {
    render() {
      return (
        <form class="login-form block-medium d-flex flex-column">
          <header>
            <h1 class="h4">Log In to Your Account</h1>
          </header>
          <div class="mt-auto mb-auto">
            <InputGroup name="Email" type="email" required />
            <InputGroup name="Password" type="password" required />
            <div class="divide-15" />
          </div>
          <div class="mt-auto">
            <div class="row narrow-gutters align-items-center">
              <div class="col-auto">
                <button class="btn link" type="submit">
                  Log In
                </button>
              </div>
              <div class="col">
                <Link to="/forgot" class="small">
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>
        </form>
      );
    }
  };

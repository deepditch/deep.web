import React, { Component } from "react";
import InputGroup from "./Form/input-group";
import { Link } from "react-router-dom";

/*
 * Form for logging into a user account
 */
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
}

/**
 * Registration Page
 */
class Login extends Component {
  render() {
    return (
      <div class="index-container">
        <div class="container container-md">
          <div class="row no-gutters">
            <div class="col-md-7">
              <div class="block-medium bg-gray text-white h-100 d-flex flex-column">
                <h1 class="h6">deep.ditch</h1>
                <p class="h3 mt-auto mb-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div class="mt-auto">
                  <Link to="/register" class="btn link bg-white mt-auto">
                    Register
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

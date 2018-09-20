import React, { Component } from "react";
import InputGroup from "./Util/input-group";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  render() {
    return (
      <form class="login-form block-medium d-flex flex-column">
        <header>
          <h1 class="h4">Log In to Your Account</h1>
        </header>
        <div class="mt-auto mb-auto">
          <InputGroup name="Username" />
          <InputGroup name="Password" />
          <div class="divide-15" />
        </div>
        <div class="mt-auto">
          <button class="btn link" type="submit">
            Log In
          </button>
          <span class="inline-spacer" />
          <a href="#" class="small">
            Forgot Your Password?
          </a>
        </div>
      </form>
    );
  }
}

class Index extends Component {
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

export default Index;

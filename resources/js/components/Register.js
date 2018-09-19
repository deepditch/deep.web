import React, { Component } from "react";
import InputGroup from "./Util/input-group";

class Register extends Component {
  render() {
    return (
      <div class="index-container">
        <div class="container container-sm">
          <form class="login-form block-medium">
            <header>
              <h1 class="h4">Register</h1>
            </header>
            <div class="mt-auto mb-auto">
              <InputGroup name="Email" />
              <InputGroup name="Username" />
              <InputGroup name="Password" />
              <InputGroup name="Confirm Password" />
              <div class="divide-15" />
            </div>
            <div class="mt-auto">
              <button class="btn link" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;

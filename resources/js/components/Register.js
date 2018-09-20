import React, { Component } from "react";
import InputGroup from "./Util/input-group";
import { RadioGroup, RadioGroupOption } from "./Util/radio-group";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: false };
  }

  render() {
    return (
      <form class="login-form block-medium">
        <header>
          <h1 class="h4">Register</h1>
        </header>
        <div class="row">
          <div class="col-auto">
            <span>Account Type</span>
            <RadioGroup name="AccountType">
              <RadioGroupOption
                value="User"
                onChange={e => this.setState({ organization: false })}
                defaultChecked
              />
              <RadioGroupOption
                value="Organization"
                onChange={e => this.setState({ organization: true })}
              />
            </RadioGroup>
          </div>
          <div class="col">
            {this.state.organization ? (
              <InputGroup name="Organization Name" required={this.state.organization} />
            ) : null}
          </div>
        </div>
        <InputGroup name="Email" required={true} />
        <InputGroup name="Password" required={true} />
        <InputGroup name="Confirm Password" required={true} />
        <div class="divide-15" />
        <button class="btn link" type="submit" onClick={this.validate}>
          Register
        </button>
        <span class="inline-spacer" />
        <span class="small">
          Have an Account? <a href="/Login">Login</a>
        </span>
      </form>
    );
  }
}

class Register extends Component {
  render() {
    return (
      <div class="index-container">
        <div class="container container-sm">
          <RegistrationForm />
        </div>
      </div>
    );
  }
}

export default Register;

import React, { Component } from "react";
import InputGroup from "./input-group";
import { RadioGroup, RadioGroupOption } from "./radio-group";
import { Link } from "react-router-dom";

/**
 * @param{AuthService} AuthService
 */
export default AuthService =>
  class RegistrationForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        /* Used to toggle visibility of the Organization Name input*/
        organization: false
      };
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
                <InputGroup
                  name="Organization Name"
                  required={this.state.organization}
                />
              ) : null}
            </div>
          </div>

          <InputGroup name="Email" type="email" required={true} />
          <InputGroup name="Password" type="password" required={true} />
          <InputGroup name="Confirm Password" type="password" required={true} />

          <div class="divide-15" />

          <div class="row narrow-gutters align-items-center">
            <div class="col-auto">
              <button class="btn link">Register</button>
            </div>
            <div class="col-auto">
              <span class="small">
                Have an Account? <Link to="/login">Login</Link>
              </span>
            </div>
          </div>
        </form>
      );
    }
  };

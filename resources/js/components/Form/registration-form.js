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
        AccountType: "User",
        "Organization Name": "",
        Username: "",
        Email: "",
        Password: "",
        "Confirm Password": ""
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      console.log(AuthService);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      AuthService.register(
        this.state.Username,
        this.state.Email,
        this.state.Password
      ).then(
        response => {
          console.log(response);
        },
        error => {
          console.error(response);
        }
      );
    }

    render() {
      return (
        <form class="login-form block-medium" onSubmit={this.handleSubmit}>
          <header>
            <h1 class="h4">Register</h1>
          </header>
          <div class="row">
            <div class="col-auto">
              <span>Account Type</span>
              <RadioGroup name="AccountType">
                <RadioGroupOption
                  value="User"
                  onChange={this.handleInputChange}
                  defaultChecked
                />
                <RadioGroupOption
                  value="Organization"
                  onChange={this.handleInputChange}
                />
              </RadioGroup>
            </div>
            <div class="col">
              {this.state.AccountType == "Organization" ? (
                <InputGroup
                  name="Organization Name"
                  required={this.state.organization}
                  onChange={this.handleInputChange}
                />
              ) : null}
            </div>
          </div>

          <InputGroup
            name="Username"
            type="text"
            required={true}
            onChange={this.handleInputChange}
          />
          <InputGroup
            name="Email"
            type="email"
            required={true}
            onChange={this.handleInputChange}
          />
          <InputGroup
            name="Password"
            type="password"
            required={true}
            onChange={this.handleInputChange}
          />
          <InputGroup
            name="Confirm Password"
            type="password"
            required={true}
            onChange={this.handleInputChange}
          />

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

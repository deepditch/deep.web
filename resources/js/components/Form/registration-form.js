import React, { Component } from "react";
import InputGroup from "./input-group";
import { RadioGroup, RadioGroupOption } from "./radio-group";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AccountType: "User",
      "Organization Name": "",
      "User Name": "",
      Email: "",
      Password: "",
      "Confirm Password": ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.register(
      this.state["User Name"],
      this.state.Email,
      this.state.Password,
      this.state.AccountType == "Organization" // If the user is also registering an organization, pass along the organization name
        ? this.state["Organization Name"]
        : null
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
                type="text"
                required
                onChange={this.handleInputChange}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        <InputGroup
          name="User Name"
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
            {this.props.pending ? (
              <span class="btn">Registering ...</span>
            ) : (
              <button class="btn link">Register</button>
            )}
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
}

RegistrationForm.PropTypes = {
  register: PropTypes.func.isRequired
};

import React, { Component } from "react";
import InputGroup from "./input-group";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: ""
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
    this.props.login(this.state.Email, this.state.Password);
  }

  render() {
    return (
      <form
        class="login-form block-medium d-flex flex-column"
        onSubmit={this.handleSubmit}
      >
        <header>
          <h1 class="h4">Log In to Your Account</h1>
        </header>
        <div class="mt-auto mb-auto">
          <InputGroup
            name="Email"
            type="email"
            required
            onChange={this.handleInputChange}
          />
          <InputGroup
            name="Password"
            type="password"
            required
            onChange={this.handleInputChange}
          />
          <div class="divide-15" />
        </div>
        <div class="mt-auto">
          <div class="row narrow-gutters align-items-center">
            <div class="col-auto">
            {this.props.pending ? (
              <span class="btn">Logging In ...</span>
            ) : (
              <button class="btn link">Log In</button>
            )}
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

LoginForm.PropTypes = {
  login: PropTypes.func.isRequired
};

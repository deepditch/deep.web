import React, { Component } from "react";
import InputGroup from "./input-group";
import { RadioGroup, RadioGroupOption } from "./radio-group";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class UserInviteForm extends Component {
  constructor(props) {
    super(props);

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

    this.props.inviteUser(this.state.Email);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="input-group row">
          <input
            type="email"
            class="form-control col"
            name="Email"
            placeholder="Users Email"
            onChange={this.handleInputChange} />
          <div class="input-group-append">
            <input
              class="btn btn-outline-secondary col-auto"
              type="submit"
              value="Invite"
              required={true}
            />
          </div>
        </div>
      </form>
    );
  }
}

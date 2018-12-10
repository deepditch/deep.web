import React, { Component } from "react";
import InputGroup from "./Form/input-group";


export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "Current Password": "",
      "New Password": "",
      "New Password Confirmation": "",
      passwordConfirmationValid: true,
      msg: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      passwordConfirmationValid:
        ([name] == "New Password Confirmation"
          ? value
          : this.state["New Password Confirmation"]) ==
        ([name] == "New Password" ? value : this.state["New Password"])
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.changePassword(
      this.state["Current Password"],
      this.state["New Password"],
      this.state["New Password Confirmation"
    ]);
  }

  render() {
    return (
      <div class="container container-md block-top block-bottom">
        <div class="row">
          <div class="col-6">
            <h1 class="h3">Change Password</h1>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div class="input-group row">
              <InputGroup
                name="Current Password"
                type="password"
                required={true}
                onChange={this.handleInputChange}
                placeholder="Enter Your Current Password"
              />

              <InputGroup
                name="New Password"
                type="password"
                required={true}
                onChange={this.handleInputChange}
                placeholder="Enter Your New Password"
                valid={this.state.passwordConfirmationValid}
              />

              <InputGroup
                name="New Password Confirmation"
                type="password"
                required={true}
                onChange={this.handleInputChange}
                placeholder="Confirm Your New Password"
                valid={this.state.passwordConfirmationValid}
              />

              {this.state.msg && <p>{this.state.msg}</p>}

              <button class="btn link">Change Password</button>
            </div>
          </form>
      </div>
    );
  }
}

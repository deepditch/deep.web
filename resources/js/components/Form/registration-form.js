import React, { Component } from "react";
import InputGroup from "./input-group";
import { RadioGroup, RadioGroupOption } from "./radio-group";
import { Link } from "react-router-dom";

export default UsersService =>
  class RegistrationForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        AccountType: "User",
        "Organization Name": "",
        "User Name": "",
        Email: "",
        Password: "",
        "Confirm Password": "",
        msg: "",
        isTokenRegistration: false,
        EmailEditable: true
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      if (this.props.token) {
        UsersService.getInviteData(this.props.token)
          .then(response => {
            console.log(response.email);
            this.setState({
              Email: response.email,
              msg: (
                <>
                  <strong>{response.email}</strong>, you have been invited to join{" "}
                  <i class="strong">{response.organization.name}</i>
                </>
              ),
              isTokenRegistration: true,
              EmailEditable: false
            });
          })
          .catch(error => {
            this.setState({
              msg: `This invitation has been revoked.`
            });
          });
      }
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
          : null,
        this.props.token
      );
    }

    render() {
      return (
        <form class="login-form block-medium" onSubmit={this.handleSubmit}>
          <header>
            <h1 class="h4">Register</h1>
            {this.state.msg && <p>{this.state.msg}</p>}
          </header>
          {!this.state.isTokenRegistration && (
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
          )}

          <InputGroup
            name="User Name"
            type="text"
            required={true}
            onChange={this.handleInputChange}
          />

          {this.state.EmailEditable && (
            <InputGroup
              name="Email"
              type="email"
              required={true}
              onChange={this.handleInputChange}
            />
          )}

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
  };

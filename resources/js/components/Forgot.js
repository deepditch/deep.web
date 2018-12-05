import React, { Component } from "react";

/**
 * Registration Page
 */
export default AuthService =>
  class Forgot extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Email: "",
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
        [name]: value
      });
    }

    handleSubmit(event) {
      event.preventDefault();
      AuthService.forgotPassword(this.state.Email)
        .then(response => {
          this.setState({
            msg: `An email has been sent to ${
              this.state.email
            } with instructions for resetting your password`
          });
        })
        .catch(error => {
          this.setState({
            msg: "We failed to send you an email."
          });
        });
    }

    render() {
      return (
        <div class="index-container">
          <div class="container container-sm">
            <form class="login-form block-medium" onSubmit={this.handleSubmit}>
              <header>
                <h1 class="h4">Forgot Your Password?</h1>
                <p>
                  Enter the email address for your account and we will send you
                  an email to reset your password.
                </p>
              </header>

              <InputGroup
                name="Email"
                type="email"
                required={true}
                onChange={this.handleInputChange}
                placeholder="Enter Your Email Address"
              />

              {this.state.msg ? (
                <p>{this.state.msg}</p>
              ) : (
                <button class="btn link">Send Password Reset Email</button>
              )}
            </form>
          </div>
        </div>
      );
    }
  };

import React, { Component } from "react";

/**
 * Registration Page
 */
export default (RegistrationForm, props) =>
  class Register extends Component {
    render() {
      return (
        <div class="index-container">
          <div class="container container-sm">
            <RegistrationForm token={this.props.match.params.token} />
          </div>
        </div>
      );
    }
  };

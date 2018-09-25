import React, { Component } from "react";

/**
 * Registration Page
 */
export default RegistrationForm =>
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
  };

import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../services/auth.service";

class LogoutButton extends Component {
  render() {
    return (
      <button class="nav-link disabled" onClick={e => this.props.logout()}>
      Logout
      </button>
    );
  }
}

export default connect(null, dispatch => {
  return {
    "logout": CreateLogoutActionDispatcher(new AuthService(), dispatch)
  }
}) (LogoutButton);
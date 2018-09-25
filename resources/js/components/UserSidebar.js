import React, { Component } from "react";

/**
 * Registration Page
 */
export default class UserSidebar extends Component {
  render() {
    return (
      <div class="block">
        <h1>{this.props.user.organization}</h1>
        <div class="divide-15" />
        <p>{this.props.user.email}</p>
        <div class="divide-10" />
        <button class="btn" onClick={this.props.logout}>
          Logout
        </button>
      </div>
    );
  }
}

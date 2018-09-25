import React, { Component } from "react";

/**
 * Registration Page
 */
export default class UserSidebar extends Component {
  render() {
    return (
      <div class="block-medium">
        <h1>{this.props.organizationName}</h1>
        <div class="divide-20"></div>
        <button class="btn" onClick={this.props.logout}>
          Logout
        </button>
      </div>
    );
  }
}

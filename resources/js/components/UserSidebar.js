import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Registration Page
 */
export default class UserSidebar extends Component {
  render() {
    return (
      <div class="block">
        <h1>{this.props.user.organization.name}</h1>
        <div class="divide-15" />
        <p>Welcome, {this.props.user.name}</p>
        <div class="divide-10" />
        <button class="btn" onClick={this.props.getUsers}>
          Users
        </button>
        <Link to="/users" class="btn link bg-white mt-auto">
          Users
        </Link>
        <button class="btn" onClick={this.props.logout}>
          Logout
        </button>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    console.log(this.state);
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-gray">
        <h1 class="h6 mb-0">
          <Link to="/" class="text-white">
            deep.ditch
          </Link>
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/damage">
                Road Damage
              </a>
            </li>
            {(JSON.parse(localStorage.getItem("user")).role === 'admin') &&
            <>
            <li class="nav-item">
              <a class="nav-link" href="/users">
                Users
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/api-tokens">
                API Tokens
              </a>
            </li>
            </>
            }
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Settings
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider" />
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li class="nav-item justify">
              <a class="nav-link disabled" href="/logout">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

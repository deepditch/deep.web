import React, { Component } from "react";
import { Link } from "react-router-dom";

export default LoginForm =>
  class Login extends Component {
    render() {
      return (
        <div class="index-container">
          <div class="container container-md">
            <div class="row no-gutters">
              <div class="col-md-7">
                <div class="block-medium bg-gray text-white h-100 d-flex flex-column">
                  <h1 class="h6">deep.ditch</h1>
                  <p class="h3 mt-auto mb-auto">
                    A road damage detection and management suite powered by artificial intelligence.
                  </p>
                  <div class="mt-auto">
                    <Link to="/register" class="btn link bg-white mt-auto">
                      Register
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

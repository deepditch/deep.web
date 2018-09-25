import React, { Component } from "react";

export default DamageMap =>
  class Map extends Component {
    render() {
      return (
        <div class="app-container">
          <div class="row no-gutters h-100">
            <div class="col-3">
              <div class="block-medium">
                <h1>Organization</h1>
                <a href="#">Account Settings</a> <br />
                <a href="#">Lorem Ipsum</a> <br />
                <a href="#">Dolor Set</a>
              </div>
            </div>
            <div class="col-9">
              <DamageMap />
            </div>
          </div>
        </div>
      );
    }
  };

import React, { Component } from "react";

export default (UserSidebar, DamageMap) =>
  class Map extends Component {
    render() {
      return (
        <div class="app-container">
          <div class="row no-gutters h-100">
            <div class="col-4">
              <UserSidebar />
            </div>
            <div class="col-10">
              <DamageMap />
            </div>
          </div>
        </div>
      );
    }
  };

import React, { Component } from "react";

export default (UserSidebar, DamageMap) =>
  class Map extends Component {
    render() {
      return (
          <div class="row no-gutters h-100">
            <div class="col-4">
              <UserSidebar />
            </div>
            <div class="col-8">
              <DamageMap />
            </div>
          </div>
      );
    }
  };

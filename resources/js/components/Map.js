import React, { Component } from "react";

export default (DamageList, DamageMap) =>
  class Map extends Component {
    render() {
      return (
        <div class="map-container">
          <div class="row no-gutters h-100">
            <div class="col-4 h-100">
              <DamageList />
            </div>
            <div class="col-8 h-100">
              <DamageMap />
            </div>
          </div>
        </div>
      );
    }
  };

import React, { Component } from "react";

export default (DamageList, DamageMap) =>
  class Map extends Component {
    render() {
      return (
        <div class="row no-gutters" style={{ height: "calc(100vh - 40px)" }}>
          <div class="col-4 h-100 d-flex flex-column">
            <DamageList />
          </div>
          <div class="col-8">
            <DamageMap />
          </div>
        </div>
      );
    }
  };

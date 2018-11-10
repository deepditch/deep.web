import React, { Component } from "react";

export const DamageMarkers = DamageMarker =>
  class DamageMarkers extends Component {
    render() {
      var markers = this.props.damages
        ? this.props.damages.map(damageId => (
            <DamageMarker
              ref={damageId}
              damageId={damageId}
              key={damageId}
              visible={this.props.visible}
              map={this.props.map}
              google={this.props.google}
            />
          ))
        : null;

      return markers;
    }
  };

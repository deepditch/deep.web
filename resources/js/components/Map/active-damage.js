import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export default class ActiveDamage extends Component {
  render() {
    return (
      <InfoWindow
        marker={this.props.marker}
        visible={this.props.visible}
      >
        <div>
          <img width="240px" src={this.props.image} /> <br />
          <h3>Type: {this.props.type}</h3>
        </div>
      </InfoWindow>
    );
  }
}

import React, { Component } from "react";
import { Marker } from "google-maps-react";

const pins = {
  D00: "D00.png",
  D01: "D01.png",
  D10: "D10.png",
  D11: "D11.png",
  D20: "D20.png",
  D40: "D40.png",
  D43: "D43.png",
  D44: "D44.png",
  default: "D00.png"
};

var pinImage = type =>
  "/img/pins/" + (pins.hasOwnProperty(type) ? pins[type] : pins["default"]);

export class DamageMarker extends Component {
  onClick(props, marker, e) {
    this.props.activateDamage(props.damageId);
  }

  render() {
    if (!this.props.map) return null;

    return (
      <Marker
        name={this.props.damage.type}
        onClick={this.onClick.bind(this)}
        position={{
          lat: this.props.damage.position.latitude,
          lng: this.props.damage.position.longitude
        }}
        options={{ icon: pinImage(this.props.damage.type) }}
        map={this.props.map}
        google={this.props.google}
        visible={this.props.visible}
      />
    );
  }
}

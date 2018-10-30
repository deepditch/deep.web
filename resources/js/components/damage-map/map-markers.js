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

export default class MapMarkers extends Component {
  shouldComponentUpdate(newProps, newState) {
    return (
      newProps.damages.length != this.props.damages.length ||
      newProps.visible != this.props.visible
    );
  }

  onMarkerClick(props, marker, e) {
    this.props.activateDamage(props.damageId);
  }

  getMarker(damageId) {
    return this.refs[damageId].marker;
  }

  render() {
    if (!this.props.map) return null;

    var _ = this;

    var markers = this.props.damages.map(damage => (
      <Marker
        name={damage.type}
        damageId={damage.id}
        ref={damage.id}
        key={damage.id}
        onClick={_.onMarkerClick.bind(_)}
        position={{
          lat: damage.position.latitude,
          lng: damage.position.longitude
        }}
        options={{ icon: pinImage(damage.type) }}
        map={this.props.map}
        google={this.props.google}
        visible={this.props.visible}
      />
    ));

    return markers;
  }
}

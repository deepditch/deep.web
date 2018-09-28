import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import config from "../../../../project.config";

class DamageMap extends Component {
  componentDidMount() {
    this.props.loadDamage();
  }

  componentDidUpdate() {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.instances.map(damage => {
      bounds.extend(
        new window.google.maps.LatLng(damage.position.lat, damage.position.lng)
      );
    });

    this.refs.map.map.fitBounds(bounds);
  }

  render() {
    return (
      <Map ref="map" google={this.props.google} zoom={14}>
        {this.props.instances &&
          this.props.instances.map(damage => (
            <Marker name={damage.type} position={damage.position} />
          ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.GoogleMapsAPIKey
})(DamageMap);

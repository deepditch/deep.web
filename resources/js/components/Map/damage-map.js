import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import config from "../../../../project.config";

class DamageMap extends Component {
  componentDidMount() {
    this.props.loadDamage();
  }

  render() {
    return (
      <Map google={this.props.google} zoom={14}>
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

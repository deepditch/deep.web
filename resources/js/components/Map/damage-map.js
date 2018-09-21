import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import RoadDamageService from "../../services/road-damage";

class DamageMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: []
    };
  }

  componentDidMount() {
    var locations = new RoadDamageService().getDamageInstances();
    this.setState({ locations: locations });
  }

  render() {
    return (
      <Map google={this.props.google} zoom={14}>
        {this.state.locations.map(damage =>
          <Marker name={damage.type} position={damage.position} />
        )}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAcf0CpiXV2Gmv6NR22b0VLGKCtkxXK9-8"
})(DamageMap);

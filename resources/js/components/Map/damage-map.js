import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import config from "../../../../project.config";
import ActiveDamage from "./active-damage";

class DamageMap extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  componentDidMount() {
    this.props.loadDamage();
  }

  componentDidUpdate() {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.instances.map(damage => {
      bounds.extend(
        new window.google.maps.LatLng(
          damage.position.latitude,
          damage.position.longitude
        )
      );
    });

    this.refs.map.map.fitBounds(bounds);
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props, marker);

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }


  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        ref="map"
        google={this.props.google}
        zoom={14}
        onClick={this.onMapClicked}
      >
        {this.props.instances &&
          this.props.instances.map(damage => (
            <Marker
              name={damage.type}
              image={damage.image}
              onClick={this.onMarkerClick}
              position={{
                lat: damage.position.latitude,
                lng: damage.position.longitude
              }}
            />
          ))}
        <ActiveDamage
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          image={this.state.selectedPlace.image}
          type={this.state.selectedPlace.type}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.GoogleMapsAPIKey
})(DamageMap);

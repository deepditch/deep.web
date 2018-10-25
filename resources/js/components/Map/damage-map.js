import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import config from "../../../../project.config";


class DamageMap extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }
  componentDidMount() {
    this.props.loadDamage();
  }

  componentDidUpdate() {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.instances.map(damage => {
      bounds.extend(
        new window.google.maps.LatLng(damage.position.latitude, damage.position.longitude)
      );
    });

    this.refs.map.map.fitBounds(bounds);
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <Map ref="map" google={this.props.google} zoom={14} onClick={this.onMapClicked}>
        {this.props.instances &&
          this.props.instances.map(damage => (
            <Marker name={damage.type} image={damage.image} onClick={this.onMarkerClick} position={{lat: damage.position.latitude, lng: damage.position.longitude}} />
          ))}
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
          <div>
            <h3>Type: {this.state.selectedPlace.name}</h3><br />
            <img width='240px' src={this.state.selectedPlace.image} />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.GoogleMapsAPIKey
})(DamageMap);

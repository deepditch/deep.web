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
        new window.google.maps.LatLng(damage.position.latitude, damage.position.longitude)
      );
    });

    this.refs.map.map.fitBounds(bounds);
  }

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

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
            <Marker name={damage.type} onClick={this.onMarkerClick} position={{lat: damage.position.latitude, lng: damage.position.longitude}} />
            <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>

          ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.GoogleMapsAPIKey
})(DamageMap);

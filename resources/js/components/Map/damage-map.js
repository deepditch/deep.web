import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import config from "../../../../project.config";
import ActiveDamage from "./active-damage";

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

class MapMarkers extends Component {
  shouldComponentUpdate(newProps, newState) {
    return newProps.damages.length != this.props.damages.length;
  }

  render() {
    if (!this.props.map) return null;

    var _ = this;

    const bounds = new window.google.maps.LatLngBounds();

    this.props.damages.map(damage => {
      bounds.extend(
        new window.google.maps.LatLng(
          damage.position.latitude,
          damage.position.longitude
        )
      );
    });

    this.props.map.fitBounds(bounds);

    var markers = this.props.damages.map(damage => (
      <Marker
        name={damage.type}
        key={damage.id}
        onClick={_.props.onMarkerClick.bind(_)}
        damage={damage}
        position={{
          lat: damage.position.latitude,
          lng: damage.position.longitude
        }}
        map={this.props.map}
        google={this.props.google}
        options={{ icon: pinImage(damage.type) }}
      />
    ));

    return markers;
  }
}

class HeatMap extends Component {
  shouldComponentUpdate(newProps, newState) {
    return newProps.damages.length != this.props.damages.length;
  }

  render() {
    var _ = this;
    var heatData = [];

    this.props.damages.forEach(function(damage) {
      damage.reports.forEach(function(report) {
        if (report.confidence >= 0.5) {
          heatData.push({
            location: new _.props.google.maps.LatLng(
              report.latitude,
              report.longitude
            ),
            weight: report.confidence
          });
        }
      });
    });

    new this.props.google.maps.visualization.HeatmapLayer({
      data: heatData, //the 'heat' of the heatmap
      map: this.props.map //the map instance
    });

    return null;
  }
}

class DamageMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {}
    };
  }

  componentDidMount() {
    this.props.loadDamage();
  }

  onMarkerClick(props, marker, e) {
    console.log(props);

    this.props.activateDamage(props.damage.id);

    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.props.activeDamageId) this.props.deactivateDamage();

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    return (
      <Map
        ref="map"
        google={this.props.google}
        zoom={14}
        onClick={this.onMapClicked.bind(this)}
      >
        <MapMarkers
          damages={this.props.damages}
          onMarkerClick={this.onMarkerClick.bind(this)}
        />

        <HeatMap damages={this.props.damages} />

        <InfoWindow
          visible={this.state.showingInfoWindow}
          marker={this.state.activeMarker}
        >
          <ActiveDamage
            damage={this.props.damages.find(
              damage => damage.id == this.props.activeDamageId
            )}
          />
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.GoogleMapsAPIKey,
  libraries: ["places", "visualization"]
})(DamageMap);

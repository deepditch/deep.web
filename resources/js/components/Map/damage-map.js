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

var pinImage = {
  get: function(type) {
    return (
      "/img/pins/" + (pins.hasOwnProperty(type) ? pins[type] : pins["default"])
    );
  }
};

class DamageMarker extends Component {
  render() {
    return (
      <Marker
        name={this.props.damage.type}
        position={{
          lat: this.props.damage.position.latitude,
          lng: this.props.damage.position.longitude
        }}
        options={{ icon: `${pinImage[this.props.damage.type]}` }}
      />
    );
  }
}

class ActiveDamageInfoWindow extends Component {
  render() {
    return (
      <InfoWindow marker={this.props.marker} visible={this.props.visible}>
        <div>
          <img width="240px" src={this.props.damage.image} /> <br />
          <h3>Type: {this.props.damage.type}</h3>
        </div>
      </InfoWindow>
    );
  }
}

class DamageMap extends Component {
  componentDidMount() {
    this.props.loadDamage();
  }

  componentDidUpdate() {
    this.markers = [];
    heatData = [];

    this.props.instances.forEach(function(damage) {
      this.markers.append(
        <DamageMarker
          key={damage.id}
          type={damage.type}
          image={damage.image}
          onClick={this.onMarkerClick.bind(this)}
          position={damage.position}
        />
      );

      damage.reports.forEach(function(report) {
        if (report.confidence >= 0.5) {
          heatData.append({
            location: new this.props.google.maps.LatLng(
              report.latitude,
              report.longitude
            ),
            weight: report.confidence
          });
        }
      });
    });

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

    new this.props.google.maps.visualization.HeatmapLayer({
      data: heatData, //the 'heat' of the heatmap
      map: this.refs.map.map //the map instance
    });
  }

  onMarkerClick(props, marker, e) {
    this.props.activateDamage(props.key);
  }

  onMapClicked(props) {
    if (this.props.activeDamageId) this.props.deactivateDamage();
  }

  render() {
    return (
      <Map
        ref="map"
        google={this.props.google}
        zoom={14}
        onClick={this.onMapClicked.bind(this)}
      >
        {markers}
        <ActiveDamageInfoWindow
          visible={this.props.activeDamageId}
          marker={this.markers[this.props.activeDamageId]}
          damage={this.props.instances[this.props.activeDamageId]}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.GoogleMapsAPIKey
})(DamageMap);

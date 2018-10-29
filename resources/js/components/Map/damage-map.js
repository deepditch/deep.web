import React, { Component } from "react";
import ReactDOM from 'react-dom';
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
    return (
      newProps.damages.length != this.props.damages.length ||
      newProps.visible != this.props.visible
    );
  }

  render() {
    if (!this.props.map) return null;

    var _ = this;

    var markers = this.props.damages.map(damage => (
      <Marker
        name={damage.type}
        key={damage.id}
        ref={damage.id}
        onClick={_.props.onMarkerClick.bind(_)}
        damage={damage}
        position={{
          lat: damage.position.latitude,
          lng: damage.position.longitude
        }}
        map={this.props.map}
        google={this.props.google}
        visible={this.props.visible}
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
      markersVisible: true,
      latitude: 42.331429,
      longitude: -83.045753
    };

    var geoSuccess = function(position) {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    };

    navigator.geolocation.getCurrentPosition(geoSuccess);
  }

  componentDidMount() {
    this.props.loadDamage();
  }

  onMarkerClick(props, marker, e) {
    this.props.activateDamage(props.damage.id);
  }

  onMapClicked(props) {
    this.props.deactivateDamage();
  }

  onZoomChanged(props) {
    this.setState({ markersVisible: this.refs.map.map.getZoom() >= 14 });
  }

  _verifyDamageReport(e, reportId) {
    if (e.target.checked) this.props.verifyDamageReport(reportId);
    else this.props.unverifyDamageReport(reportId);
  }

  onInfoWindowOpen(props, e) {
    var activeDamage = this.props.damages.find(
      damage => damage.id == this.props.activeDamageId
    );

    const content = (
      <ActiveDamage
        {...activeDamage}
        verifyDamageReport={this._verifyDamageReport.bind(this)}
      />
    );

    ReactDOM.render(
      React.Children.only(content),
      document.getElementById("iwc")
    );
  }

  render() {
    var activeMarker =
      this.refs.markers && this.props.activeDamageId
        ? this.refs.markers.refs[this.props.activeDamageId].marker
        : null;

    return (
      <Map
        ref="map"
        google={this.props.google}
        zoom={14}
        onClick={this.onMapClicked.bind(this)}
        onZoom_changed={this.onZoomChanged.bind(this)}
        initialCenter={{
          lat: this.state.latitude,
          lng: this.state.longitude
        }}
      >
        <MapMarkers
          ref={"markers"}
          damages={this.props.damages}
          onMarkerClick={this.onMarkerClick.bind(this)}
          visible={this.state.markersVisible}
        />

        <HeatMap damages={this.props.damages} />

        <InfoWindow
          visible={this.props.activeDamageId && activeMarker ? true : false}
          marker={activeMarker}
          onOpen={e => {
            this.onInfoWindowOpen(this.props, e);
          }}
        >
          <div id="iwc" />
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.GoogleMapsAPIKey,
  libraries: ["places", "visualization"]
})(DamageMap);

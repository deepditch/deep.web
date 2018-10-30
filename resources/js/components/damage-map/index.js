import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import config from "../../../../project.config";
import ActiveDamage from "./active-damage";
import HeatMap from "./heat-map";
import MapMarkers from "./map-markers";

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
        ? this.refs.markers.getMarker(this.props.activeDamageId)
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
          activateDamage={this.props.activateDamage}
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

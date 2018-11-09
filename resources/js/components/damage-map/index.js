import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import config from "../../../../project.config";

export * from "./heat-map";
export * from "./damage-marker";
export * from "./damage-markers";
export * from "./active-damage-window";

const DamageMap = (DamageMarkers, HeatMap, ActiveDamageWindow) =>
  class DamageMap extends Component {
    constructor(props) {
      super(props);

      this.state = {
        markersVisible: true,
        heatMapVisible: true,
        latitude: 42.331429,
        longitude: -83.045753
      };

      // var geoSuccess = function(position) {
      //   this.setState({
      //     latitude: position.coords.latitude,
      //     longitude: position.coords.longitude
      //   });
      // }.bind(this);

      // navigator.geolocation.getCurrentPosition(geoSuccess);
    }

    componentDidMount() {
      this.props.loadDamage();
    }

    onMapClicked(props) {
      this.props.deactivateDamage();
    }

    onZoomChanged(props) {
      this.setState({ markersVisible: this.refs.map.map.getZoom() >= 16 });
    }

    render() {
      console.log(ActiveDamageWindow)
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
          <ActiveDamageWindow />
          <DamageMarkers visible={this.state.markersVisible} />
          <HeatMap visible={this.state.heatMapVisible}/>
        </Map>
      );
    }
  };

export default (DamageMarker, HeatMap, ActiveDamage) =>
  GoogleApiWrapper({
    apiKey: config.GoogleMapsAPIKey,
    libraries: ["places", "visualization"]
  })(DamageMap(DamageMarker, HeatMap, ActiveDamage));

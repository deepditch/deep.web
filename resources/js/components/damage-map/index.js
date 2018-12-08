import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import config from "../../../../project.config";

export * from "./heat-map";
export * from "./damage-marker";
export * from "./damage-markers";
export * from "./active-damage-window";
export * from "./expanded-damage-window";

const DamageMap = (
  DamageMarkers,
  HeatMap,
  ActiveDamageWindow,
  ExpandedDamageWindow
) =>
  class DamageMap extends Component {
    constructor(props) {
      super(props);

      this.state = {
        markersVisible: true,
        heatMapVisible: true,
        latitude: 42.331429,
        longitude: -83.045753
      };
    }

    componentDidMount() {
      this.props.loadDamage();

      var geoSuccess = function(position) {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }.bind(this);
      navigator.geolocation.getCurrentPosition(geoSuccess);
    }

    onMapClicked(props) {
      this.props.deactivateDamage();
    }

    onZoomChanged(props) {
      this.setState({ markersVisible: this.refs.map.map.getZoom() >= 15 });
    }

    render() {
      return (
        <>
          <ExpandedDamageWindow />
          <Map
            ref="map"
            google={this.props.google}
            zoom={14}
            onClick={this.onMapClicked.bind(this)}
            onZoom_changed={this.onZoomChanged.bind(this)}
            center={{
              lat: this.state.latitude,
              lng: this.state.longitude
            }}
          >
            <ActiveDamageWindow />
            <DamageMarkers visible={this.state.markersVisible} />
            <HeatMap visible={this.state.heatMapVisible} />
          </Map>
        </>
      );
    }
  };

export default (DamageMarker, HeatMap, ActiveDamage, ExpandedDamageWindow) =>
  GoogleApiWrapper({
    apiKey: config.GoogleMapsAPIKey,
    libraries: ["places", "visualization"]
  })(DamageMap(DamageMarker, HeatMap, ActiveDamage, ExpandedDamageWindow));

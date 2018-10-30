import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import config from "../../../../project.config";

export * from "./heat-map";
export * from "./damage-marker";
export * from "./active-damage";

const DamageMap = (DamageMarker, HeatMap, ActiveDamage) =>
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
      }.bind(this);

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

    onInfoWindowOpen(props, e) {
      ReactDOM.render(
        React.Children.only(<ActiveDamage />),
        document.getElementById("iwc")
      );
    }

    render() {
      var activeMarker = this.refs[this.props.activeDamageId];

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
          {this.props.damages &&
            this.props.damages.map(damageId => (
              <DamageMarker
                damageId={damageId}
                key={damageId}
                ref={damageId}
                visible={this.state.markersVisible}
              />
            ))}

          <HeatMap />

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
  };

export default (DamageMarker, HeatMap, ActiveDamage) =>
  GoogleApiWrapper({
    apiKey: config.GoogleMapsAPIKey,
    libraries: ["places", "visualization"]
  })(DamageMap(DamageMarker, HeatMap, ActiveDamage));

import React, { Component } from "react";

export default class HeatMap extends Component {
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

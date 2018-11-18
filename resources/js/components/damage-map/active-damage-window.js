import React, { Component } from "react";
import ReactDOM from "react-dom";
import { mapTypeToDescription } from "../../helpers/damage.helpers";
import Checkbox from "../Form/checkbox";

export class ActiveDamageWindow extends Component {
  _verifyDamageReport(e, reportId) {
    if (e.target.checked) this.props.verifyDamageReport(reportId);
    else this.props.unverifyDamageReport(reportId);
  }

  render() {
    return (
      <MapPopup
        visible={this.props.damage ? true : false}
        position={
          this.props.damage
            ? {
                lat: this.props.damage.position.latitude,
                lng: this.props.damage.position.longitude
              }
            : {
                lat: 0,
                lng: 0
              }
        }
        google={this.props.google}
        map={this.props.map}
      >
        {this.props.damage && (
          <div
            class="damage-info-window"
            ref={ref =>
              ref && this.props.google.maps.OverlayView.preventMapHitsFrom(ref)
            }
          >
            <button class="expand" onClick={this.props.expand}>
              <span />
            </button>
            <img width="300px" src={this.props.damage.image.url} />
            <div class="content">
              <h6 class="mb-1">
                {mapTypeToDescription(this.props.damage.type)}
              </h6>
              <p>
                {this.props.damage.position.streetname
                  ? this.props.damage.position.streetname
                  : "Street Unknown"}
                ({this.props.damage.position.direction})
              </p>
              <footer class="row align-items-center">
                <div class="col-9">
                  <p class="h5 small mb-0">{this.props.damage.label}</p>
                </div>
                <div class="col-3">
                  <Checkbox
                    checked={this.props.damage.verified ? true : false}
                    onChange={e => {
                      this._verifyDamageReport(
                        e,
                        this.props.damage.reportId
                      ).bind(this);
                    }}
                  />
                </div>
              </footer>
            </div>
          </div>
        )}
      </MapPopup>
    );
  }
}

export class MapPopup extends Component {
  componentDidMount() {
    this.content = document.createElement("div");
    this.mapHasLoaded = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.renderPopup();
    }

    if (!this.popup) return;

    if (this.props.position !== prevProps.position) {
      this.popup.setPosition(
        new this.props.google.maps.LatLng(
          this.props.position.lat,
          this.props.position.lng
        )
      );
    }

    if (this.props.visible) this.popup.open();
    else this.popup.close();

    if (this.props.children !== prevProps.children && this.props.children)
      ReactDOM.render(React.Children.only(this.props.children), this.content);

    if (this.mapHasLoaded) this.popup.draw();
  }

  definePopupClass(google) {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    const Popup = function(position, content) {
      this.position = position;

      content.classList.add("popup-bubble-content");

      var pixelOffset = document.createElement("div");
      pixelOffset.classList.add("popup-bubble-anchor");
      pixelOffset.appendChild(content);

      this.anchor = document.createElement("div");
      this.anchor.classList.add("popup-tip-anchor");
      this.anchor.appendChild(pixelOffset);

      this.anchor.style.cursor = "auto";

      this.visible = false;
      this.inbounds = false;

      // Optionally stop clicks, etc., from bubbling up to the map.
      // this.stopEventPropagation();
    };

    // NOTE: google.maps.OverlayView is only defined once the Maps API has
    // loaded. That is why Popup is defined inside initMap().
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);

    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function() {
      this.getPanes().floatPane.appendChild(this.anchor);
    };

    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function() {
      if (this.anchor.parentElement) {
        this.anchor.parentElement.removeChild(this.anchor);
      }
    };

    /** Called when the popup needs to draw itself. */
    Popup.prototype.draw = function() {
      var divPosition = this.getProjection().fromLatLngToDivPixel(
        this.position
      );

      // Hide the popup when it is far out of view.
      this.inbounds =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000;

      var visible = this.visible && this.inbounds;

      if (visible) {
        this.anchor.style.left = divPosition.x + "px";
        this.anchor.style.top = divPosition.y + "px";
      }

      var display = visible ? "block" : "none";

      if (this.anchor.style.display !== display) {
        this.anchor.style.display = display;
      }
    };

    Popup.prototype.setPosition = function(position) {
      this.position = position;
    };

    Popup.prototype.open = function() {
      this.visible = true;

      var visible = this.visible && this.inbounds;

      var display = visible ? "block" : "none";

      if (this.anchor.style.display !== display) {
        this.anchor.style.display = display;
      }
    };

    Popup.prototype.close = function() {
      this.visible = false;

      var visible = this.visible && this.inbounds;

      var display = visible ? "block" : "none";

      if (this.anchor.style.display !== display) {
        this.anchor.style.display = display;
      }
    };

    /** Stops clicks/drags from bubbling up to the map. */
    Popup.prototype.stopEventPropagation = function() {
      var anchor = this.anchor;

      [
        "click",
        "dblclick",
        "contextmenu",
        "wheel",
        "mousedown",
        "touchstart",
        "pointerdown"
      ].forEach(function(event) {
        anchor.addEventListener(event, function(e) {
          e.stopPropagation();
        });
      });
    };

    return Popup;
  }

  renderPopup() {
    if (!this.props.map) return;

    var Popup = this.definePopupClass(this.props.google);

    this.popup = new Popup(
      new this.props.google.maps.LatLng(
        this.props.position.lat,
        this.props.position.lng
      ),
      this.content
    );

    this.popup.setMap(this.props.map);

    this.props.google.maps.event.addListenerOnce(
      this.props.map,
      "bounds_changed",
      function() {
        this.mapHasLoaded = true;
      }.bind(this)
    );
  }

  render() {
    return null;
  }
}

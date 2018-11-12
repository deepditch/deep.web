import React, { Component } from "react";
import Checkbox from "../Form/checkbox";
import { mapTypeToDescription } from "../../helpers/damage-types";

export class ExpandedDamageWindow extends Component {
  _verifyDamageReport(e, reportId) {
    if (e.target.checked) this.props.verifyDamageReport(reportId);
    else this.props.unverifyDamageReport(reportId);
  }

  _close(e) {
    this.props.close();
  }

  render() {
    if (!this.props.damage || !this.props.visible) return null;

    return (
      <div class="expanded-damage-window">
        <button onClick={this._close.bind(this)} class="close" />
        <div class="image">
          <img src={this.props.damage.image} />
        </div>
        <div class="content block">
          <h6 class="mb-1">
            {mapTypeToDescription(this.props.damage.type)} (
            {this.props.damage.type})
          </h6>
          <p>
            {this.props.damage.position.streetname} (
            {this.props.damage.position.direction})
          </p>
          <footer class="row align-items-center">
            <div class="col-9">
              <p class="h5 small mb-0">{this.props.damage.label}</p>
            </div>
            <div class="col-3">
              <Checkbox
                checked={this.props.damage.verified ? true : false}
                onChange={e => {
                  this._verifyDamageReport(e, this.props.damage.reportId).bind(
                    this
                  );
                }}
              />
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { mapTypeToDescription } from "../../helpers/damage-types";
import Checkbox from "../Form/checkbox";

export class ActiveDamage extends Component {
  _verifyDamageReport(e, reportId) {
    if (e.target.checked) this.props.verifyDamageReport(reportId);
    else this.props.unverifyDamageReport(reportId);
  }

  render() {
    return (
      <div class="damage-info-window">
        <img width="300px" src={this.props.damage.image} />
        <div class="content">
          <h6 class="mb-1">{mapTypeToDescription(this.props.damage.type)}</h6>
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

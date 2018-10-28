import React, { Component } from "react";
import { mapTypeToDescription } from "../../helpers/damage-types";
import Checkbox from "../Form/checkbox";

export default class ActiveDamage extends Component {
  render() {
    return (
      <div class="damage-info-window">
        <img width="300px" src={this.props.image} />
        <div class="content">
          <h6 class="mb-1">{mapTypeToDescription(this.props.type)}</h6>
          <p>
            {this.props.position.streetname} ({this.props.position.direction})
          </p>
          <footer class="row align-items-center">
            <div class="col-6">
              <p class="h5 small mb-0">{this.props.label}</p>
            </div>
            <div class="col-6">
              <Checkbox
                checked={this.props.verified ? true : false}
                onChange={e => {
                  this.props.verifyDamageReport(e, this.props.reportId);
                }}
              />
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

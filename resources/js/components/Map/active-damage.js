import React, { Component } from "react";
import { mapTypeToDescription } from "../../helpers/damage-types";

export default class ActiveDamage extends Component {
  render() {
    var verified = this.props.verified ? "Verified" : "Unverified";

    return (
      <div class="damage-info-window">
        <img width="240px" src={this.props.image} />
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
              {verified}
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

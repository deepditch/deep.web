import React, { Component } from "react";
import ScrollSection from "../scroll-section";

export * from "./damage-filters";
export * from "./damage-list-item";

export default (DamageListItem, DamageFilters) =>
  class DamageList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        filterStreetname: "",
        filterType: "",
        filterStatus: "",
        filterVerified: ""
      };
    }

    render() {
      return (
        <div>
          <div class="block-medium-top block-medium-left block-medium-right">
            <h1 class="h2">Damages</h1>
            <div class="divide-30" />
            <DamageFilters />
          </div>
          <ScrollSection>
            <div class="block-medium-left block-medium-right block-medium-bottom">
              <div class="divide-30" />
              <table class="damage-list">
                <thead>
                  <tr>
                    <th class="streetname">Street</th>
                    <th class="type">Type</th>
                    <th class="label">Status</th>
                    <th class="verified">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.damages &&
                    this.props.damages.map(damageId => (
                      <DamageListItem key={damageId} damageId={damageId} />
                    ))}
                </tbody>
              </table>
            </div>
          </ScrollSection>
        </div>
      );
    }
  };
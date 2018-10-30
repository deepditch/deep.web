import React, { Component } from "react";
import ScrollSection from "../scroll-section";
import DamageFilters from "./damage-filters";
import DamageListItem from "./damage-list-item";

export default class DamageList extends Component {
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
    var listItems = this.props.damages.map(damage => (
      <DamageListItem
        key={damage.id}
        activateDamage={this.props.activateDamage}
        damage={damage}
        active={this.props.activeDamageId == damage.id}
        verifyDamageReport={this.props.verifyDamageReport}
        unverifyDamageReport={this.props.unverifyDamageReport}
      />
    ));

    return (
      <>
        <div class="block-medium-top block-medium-left block-medium-right">
          <h1 class="h2">Damages</h1>
          <div class="divide-30" />
          <DamageFilters loadDamage={this.props.loadDamage} />
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
              <tbody>{listItems}</tbody>
            </table>
          </div>
        </ScrollSection>
      </>
    );
  }
}

export * from "./damage-filters";
export * from "./damage-list-item";

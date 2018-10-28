import React, { Component } from "react";
import ScrollSection from "../scroll-section";
import Checkbox from "../Form/checkbox";

class DamageListItem extends Component {
  _verifyDamageReport(e) {
    if (e.target.checked)
      this.props.verifyDamageReport(this.props.damage.reportId);
    else
      this.props.unverifyDamageReport(this.props.damage.reportId);
  }

  render() {
    return (
      <tr
        class={this.props.active ? "active" : ""}
        onClick={this.props.onClick}
      >
        <td class="streetname">
          {this.props.damage.position.streetname} (
          {this.props.damage.position.direction})
        </td>
        <td class="type">{this.props.damage.type}</td>
        <td class="label">{this.props.damage.label}</td>
        <td class="verified">
          <Checkbox
            checked={this.props.damage.verified ? true : false}
            onChange={this._verifyDamageReport.bind(this)}
          />
        </td>
      </tr>
    );
  }
}

export default class DamageList extends Component {
  handleListItemClick = (e, damage) => {
    this.props.activateDamage(damage.id);
  };

  render() {
    var listItems = this.props.damages.map(damage => (
      <DamageListItem
        key={damage.id}
        onClick={e => this.handleListItemClick(e, damage)}
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
        </div>
        <ScrollSection>
          <div class="block-medium-left block-medium-right block-medium-bottom">
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

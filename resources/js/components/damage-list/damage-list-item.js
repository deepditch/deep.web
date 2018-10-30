import React, { Component } from "react";

export class DamageListItem extends Component {
  _verifyDamageReport(e) {
    if (e.target.checked)
      this.props.verifyDamageReport(this.props.damage.reportId);
    else this.props.unverifyDamageReport(this.props.damage.reportId);
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

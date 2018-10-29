import React, { Component } from "react";
import ScrollSection from "../scroll-section";
import Checkbox from "../Form/checkbox";

class DamageListItem extends Component {
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

export default class DamageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStreetname: "",
      filterType: "",
      filterStatus: "",
      filterVerified: ""
    };

    this.filterChange = this.filterChange.bind(this);
  }

  handleListItemClick = (e, damage) => {
    this.props.activateDamage(damage.id);
  };

  filterChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.loadDamage(
        this.state.filterStreetname,
        this.state.filterType,
        this.state.filterStatus,
        this.state.filterVerified
      );
    });
  }

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
          <form>
              <table class="filter">
                <tbody>
                  <tr>
                    <td>
                      Streetname
                      <input
                        name="filterStreetname"
                        type="text"
                        onChange={this.filterChange}
                      />
                    </td>
                    <td>
                      Type
                      <select name="filterType" onBlur={this.filterChange}>
                        <option />
                        <option value="D00">D00</option>
                        <option value="D01">D01</option>
                        <option value="D10">D10</option>
                        <option value="D11">D11</option>
                        <option value="D20">D20</option>
                        <option value="D40">D40</option>
                        <option value="D43">D43</option>
                        <option value="D44">D44</option>
                      </select>
                    </td>
                    <td>
                      Status
                      <select name="filterStatus" onChange={this.filterChange}>
                        <option />
                        <option value="pending-repair">pending-repair</option>
                        <option value="repairing">repairing</option>
                        <option value="done">done</option>
                        <option value="wont-do">wont-do</option>
                      </select>
                    </td>
                    <td>
                      Verified
                      <select name="filterVerified" onBlur={this.filterChange}>
                        <option />
                        <option value="true">Verified</option>
                        <option value="false">Unverified</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
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

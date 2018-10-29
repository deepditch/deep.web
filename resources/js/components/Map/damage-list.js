import React, { Component } from "react";
import ScrollSection from "../scroll-section";

class DamageListItem extends Component {
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
        <td class="verified">{this.props.damage.verified}</td>
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
    }

    this.filterChange = this.filterChange.bind(this);
  }

  handleListItemClick = (e, damage) => {
    this.props.activateDamage(damage.id);
  };

  filterChange(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      this.props.loadDamage(this.state.filterStreetname, this.state.filterType, this.state.filterStatus, this.state.filterVerified)
    });
  };

  render() {
    var listItems = this.props.damages.map(damage => (
      <DamageListItem
        key={damage.id}
        onClick={e => this.handleListItemClick(e, damage)}
        damage={damage}
        active={this.props.activeDamageId == damage.id}
      />
    ));
    return (
      <>
        <div class="block-medium-top block-medium-left block-medium-right">
          <h1 class="h2">Damages</h1>
          <div class="divide-30"></div>
        </div>
        <ScrollSection>
          <div class="block-medium-left block-medium-right block-medium-bottom">
          <form>
            <table class="filter">
            <tr>
                  <td>Streetname<input name='filterStreetname' type='text' onChange={this.filterChange} /></td>
                  <td>
                    Type
                    <select name='filterType' onBlur={this.filterChange}>
                      <option></option>
                      <option name='D00'>D00</option>
                      <option name='D01'>D01</option>
                      <option name='D10'>D10</option>
                      <option name='D11'>D11</option>
                      <option name='D20'>D20</option>
                      <option name='D40'>D40</option>
                      <option name='D43'>D43</option>
                      <option name='D44'>D44</option>
                    </select>
                  </td>
                  <td>
                    Status
                    <select name='filterStatus' onChange={this.filterChange}>
                    <option></option>
                      <option name="pending-repair">pending-repair</option>
                      <option name="repairing">repairing</option>
                      <option name="done">done</option>
                      <option name="wont-do">wont-do</option>
                    </select>
                  </td>
                  <td>
                    Verified
                    <select name="filterVerified" onBlur={this.filterChange}>
                      <option></option>
                      <option name="true">Verified</option>
                      <option name="false">Unverified</option>
                    </select>
                  </td>
            </tr>
            </table>
            </form>
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

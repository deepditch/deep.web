import React, { Component } from "react";

export default class DamageFilters extends Component {
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
    return (
      <form>
        <table class="filter">
          <tbody>
            <tr>
              <td>
                Streetname
                <input
                  name="filterStreetname"
                  type="text"
                  onChange={this.filterChange.bind(this)}
                />
              </td>
              <td>
                Type
                <select
                  name="filterType"
                  onChange={this.filterChange.bind(this)}
                >
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
                <select
                  name="filterStatus"
                  onChange={this.filterChange.bind(this)}
                >
                  <option />
                  <option value="pending-repair">pending-repair</option>
                  <option value="repairing">repairing</option>
                  <option value="done">done</option>
                  <option value="wont-do">wont-do</option>
                </select>
              </td>
              <td>
                Verified
                <select
                  name="filterVerified"
                  onChange={this.filterChange.bind(this)}
                >
                  <option />
                  <option value="true">Verified</option>
                  <option value="false">Unverified</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

import React, { Component } from "react";
import InputGroup from "../Form/input-group";
import { mapStatusToString } from "../../helpers/damage.helpers";

export class DamageFilters extends Component {
  filterChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.filterDamages(
        this.state["Street Name"],
        this.state.Type,
        this.state.Status,
        this.state.Verified
      );
    });
  }

  render() {
    return (
      <form>
        <table class="filter damage-list">
          <thead>
            <tr>
              <th class="streetname">
                <label class="input-group">
                  Street name
                  <input
                    name="Street Name"
                    onChange={this.filterChange.bind(this)}
                    type="text"
                  />
                </label>
              </th>
              <th class="type">
                <label class="input-group">
                  Type
                  <div class="select">
                    <select name="Type" onChange={this.filterChange.bind(this)}>
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
                  </div>
                </label>
              </th>
              <th class="status">
                <label class="input-group">
                  Status
                  <div class="select">
                    <select
                      name="Status"
                      onChange={this.filterChange.bind(this)}
                    >
                      <option />
                      <option value="pending-repair">
                        {mapStatusToString("pending-repair")}
                      </option>
                      <option value="repairing">
                        {mapStatusToString("repairing")}
                      </option>
                      <option value="done">{mapStatusToString("done")}</option>
                      <option value="wont-do">
                        {mapStatusToString("wont-do")}
                      </option>
                    </select>
                  </div>
                </label>
              </th>
              <th class="verified">
                <label class="input-group">
                  Verified
                  <div class="select">
                    <select
                      name="Verified"
                      onChange={this.filterChange.bind(this)}
                    >
                      <option />
                      <option value="true">Verified</option>
                      <option value="false">Unverified</option>
                    </select>
                  </div>
                </label>
              </th>
            </tr>
          </thead>
        </table>
      </form>
    );
  }
}

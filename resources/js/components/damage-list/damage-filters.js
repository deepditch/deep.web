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
        <table class="filter">
          <tbody>
            <tr>
              <td>
                <InputGroup
                  name="Street Name"
                  type="text"
                  onChange={this.filterChange.bind(this)}
                  required={true}
                />
              </td>
              <td>
                <label class="input-group">
                  Type
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
                </label>
              </td>
              <td>
                <label class="input-group">
                  Status
                  <select name="Status" onChange={this.filterChange.bind(this)}>
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
                </label>
              </td>
              <td>
                <label class="input-group">
                  Verified
                  <select
                    name="Verified"
                    onChange={this.filterChange.bind(this)}
                  >
                    <option />
                    <option value="true">Verified</option>
                    <option value="false">Unverified</option>
                  </select>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}

import React, { Component } from "react";
import Checkbox from "../Form/checkbox";
import { RadioGroup, RadioGroupOption, CheckboxGroupOption } from "../Form/radio-group";
import { mapTypeToDescription } from "../../helpers/damage-types";

export class ExpandedDamageWindow extends Component {
  _verifyDamageReport(e, reportId) {
    if (e.target.checked) this.props.verifyDamageReport(reportId);
    else this.props.unverifyDamageReport(reportId);
  }

  _close(e) {
    this.props.close();
  }

  render() {
    if (!this.props.damage || !this.props.visible) return null;

    return (
      <div class="expanded-damage-window">
        <button onClick={this._close.bind(this)} class="close" />
        <div class="image">
          <img src={this.props.damage.image} />
        </div>
        <div class="content block">
          <h6 class="mb-1">
            {mapTypeToDescription(this.props.damage.type)} (
            {this.props.damage.type})
          </h6>
          <p>
            {this.props.damage.position.streetname} (
            {this.props.damage.position.direction})
          </p>
          <footer>

              <RadioGroup name="StatusLabel">
                <RadioGroupOption
                  value="Won't Repair"
                />
                <RadioGroupOption value="Needs Repair" defaultChecked />
                <RadioGroupOption
                  value="Repair In Progress"
                />
                <RadioGroupOption
                  value="Repaired"
                />
              </RadioGroup>
              <RadioGroup name="DamageType">
                <CheckboxGroupOption
                  value="D00"
                />
                <CheckboxGroupOption value="D01" />
                <CheckboxGroupOption
                  value="D10"
                />
                <CheckboxGroupOption
                  value="D11"
                />
                <CheckboxGroupOption
                  value="D20"
                />
                <CheckboxGroupOption
                  value="D40"
                />
                <CheckboxGroupOption
                  value="D43"
                />
                <CheckboxGroupOption
                  value="D44"
                />
              </RadioGroup>

          </footer>
        </div>
      </div>
    );
  }
}

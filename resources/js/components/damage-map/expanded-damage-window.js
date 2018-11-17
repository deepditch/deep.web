import React, { Component } from "react";
import Checkbox from "../Form/checkbox";
import {
  RadioGroup,
  RadioGroupOption,
  CheckboxGroupOption
} from "../Form/radio-group";
import { mapTypeToDescription } from "../../helpers/damage-types";

export class ExpandedDamageWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editOpen: false
    };
  }
  _verifyDamageReport(e, reportId) {
    if (e.target.checked) this.props.verifyDamageReport(reportId);
    else this.props.unverifyDamageReport(reportId);
  }

  _close(e) {
    this.props.close();
  }

  _openEdit() {
    this.setState({ editOpen: true });
  }

  _closeEdit() {
    this.setState({ editOpen: false });
  }

  render() {
    if (!this.props.damage || !this.props.visible) return null;

    return (
      <div class="expanded-damage-window">
        <button onClick={this._close.bind(this)} class="close" />
        <div class="image">
          <img src={this.props.damage.image} />
        </div>
        <div class="content block-medium">
          <div class="row align-items-center">
            <div class="col-md-5">
              <h6 class="mb-1">
                {mapTypeToDescription(this.props.damage.type)}
              </h6>
              <p>
                {this.props.damage.position.streetname
                  ? this.props.damage.position.streetname
                  : "Street Unknown"}{" "}
                ({this.props.damage.position.direction})
              </p>
            </div>
            <div class="col-md-7">
              <RadioGroup name="StatusLabel">
                <RadioGroupOption value="Won't Repair" />
                <RadioGroupOption value="Needs Repair" defaultChecked />
                <RadioGroupOption value="Repair In Progress" />
                <RadioGroupOption value="Repaired" />
              </RadioGroup>
            </div>
          </div>
          <hr />
          <div class="divide-15" />
          <p class="label">
            Damage Visible In This Image
            {this.state.editOpen && (
              <>
                {" - "}
                <i class="small light-gray-text">Select all that apply</i>
              </>
            )}
          </p>
          {this.state.editOpen ? (
            <>
              <RadioGroup name="StatusLabel">
                <CheckboxGroupOption value="D00">
                  {mapTypeToDescription("D00")}
                </CheckboxGroupOption>
                <CheckboxGroupOption value="D01">
                  {mapTypeToDescription("D01")}
                </CheckboxGroupOption>
                <CheckboxGroupOption value="D10">
                  {mapTypeToDescription("D10")}
                </CheckboxGroupOption>
                <CheckboxGroupOption value="D11">
                  {mapTypeToDescription("D11")}
                </CheckboxGroupOption>
                <CheckboxGroupOption value="D20">
                  {mapTypeToDescription("D20")}
                </CheckboxGroupOption>
                <CheckboxGroupOption value="D40">
                  {mapTypeToDescription("D40")}
                </CheckboxGroupOption>
                <CheckboxGroupOption value="D43" checked>
                  {mapTypeToDescription("D43")}
                </CheckboxGroupOption>
                <CheckboxGroupOption value="D44" checked>
                  {mapTypeToDescription("D44")}
                </CheckboxGroupOption>
              </RadioGroup>
              <div>
                <button class="btn btn-small bg-green link verify">
                  Verify
                </button>
              </div>
            </>
          ) : (
            <div class="row narrow-gutters">
              <div class="col-auto">
                <span class="tag tag-D44 active">White Line Blur</span>
              </div>
              <div class="col-auto">
                <span class="tag tag-D43 link">Crosswalk Blur</span>
              </div>
              <div class="col-auto">
                <span class="pipe" />
              </div>
              <div class="col-auto">
                <button
                  class="btn btn-small link edit"
                  onClick={this._openEdit.bind(this)}
                >
                  Edit
                </button>
              </div>
              <div class="col-auto">
                <button class="btn btn-small bg-green link verify">
                  Verify
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
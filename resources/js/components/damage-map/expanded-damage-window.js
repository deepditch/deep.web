import React, { Component } from "react";
import {
  RadioGroup,
  RadioGroupOption,
  CheckboxGroupOption
} from "../Form/radio-group";
import {
  mapTypeToDescription,
  mapStatusToString
} from "../../helpers/damage.helpers";

export class ExpandedDamageWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editOpen: false,
      damagesInImage: {
        D00: false,
        D01: false,
        D10: false,
        D11: false,
        D20: false,
        D40: false,
        D43: false,
        D44: false
      }
    };

    this._handleTypeCheckboxChange = this._handleTypeCheckboxChange.bind(this);
    this._verify = this._verify.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.damage) {
      this.setState({
        editOpen: false,
        damagesInImage: {
          D00: nextProps.damage.image.reports.some(
            report => report.type == "D00" && !report.false_positive
          ),
          D01: nextProps.damage.image.reports.some(
            report => report.type == "D01" && !report.false_positive
          ),
          D10: nextProps.damage.image.reports.some(
            report => report.type == "D10" && !report.false_positive
          ),
          D11: nextProps.damage.image.reports.some(
            report => report.type == "D11" && !report.false_positive
          ),
          D20: nextProps.damage.image.reports.some(
            report => report.type == "D20" && !report.false_positive
          ),
          D40: nextProps.damage.image.reports.some(
            report => report.type == "D40" && !report.false_positive
          ),
          D43: nextProps.damage.image.reports.some(
            report => report.type == "D43" && !report.false_positive
          ),
          D44: nextProps.damage.image.reports.some(
            report => report.type == "D44" && !report.false_positive
          )
        }
      });
    }
  }

  _close(e) {
    this._closeEdit();
    this.props.close();
  }

  _openEdit() {
    this.setState({ editOpen: true });
  }

  _closeEdit() {
    this.setState({ editOpen: false });
  }

  _handleStatusRadioChange(e) {
    this.props.changeStatus(this.props.damage.id, e.currentTarget.value);
  }

  _handleTypeCheckboxChange(e) {
    this.setState({
      damagesInImage: {
        ...this.state.damagesInImage,
        [e.currentTarget.value]: e.currentTarget.checked
      }
    });
  }

  _verify() {
    this.props.verifyDamageReport(this.props.damage.image.reports, this.state.damagesInImage);
    this._closeEdit()
  }

  render() {
    if (!this.props.damage || !this.props.visible) return null;

    return (
      <div class="expanded-damage-window">
        <button onClick={this._close.bind(this)} class="close" />
        <div class="image">
          <img src={this.props.damage.image.url} />
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
                <RadioGroupOption
                  value="wont-do"
                  checked={this.props.damage.label == "wont-do"}
                  onChange={this._handleStatusRadioChange.bind(this)}
                >
                  {mapStatusToString("wont-do")}
                </RadioGroupOption>
                <RadioGroupOption
                  value="pending-repair"
                  checked={this.props.damage.label == "pending-repair"}
                  onChange={this._handleStatusRadioChange.bind(this)}
                >
                  {mapStatusToString("pending-repair")}
                </RadioGroupOption>
                <RadioGroupOption
                  value="repairing"
                  checked={this.props.damage.label == "repairing"}
                  onChange={this._handleStatusRadioChange.bind(this)}
                >
                  {mapStatusToString("repairing")}
                </RadioGroupOption>
                <RadioGroupOption
                  value="done"
                  checked={this.props.damage.label == "done"}
                  onChange={this._handleStatusRadioChange.bind(this)}
                >
                  {mapStatusToString("done")}
                </RadioGroupOption>
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
                <CheckboxGroupOption
                  value="D00"
                  checked={this.state.damagesInImage.D00}
                  onChange={this._handleTypeCheckboxChange}
                >
                  {mapTypeToDescription("D00")}
                </CheckboxGroupOption>
                <CheckboxGroupOption
                  value="D01"
                  checked={this.state.damagesInImage.D01}
                  onChange={this._handleTypeCheckboxChange}
                >
                  {mapTypeToDescription("D01")}
                </CheckboxGroupOption>
                <CheckboxGroupOption
                  value="D10"
                  checked={this.state.damagesInImage.D10}
                  onChange={this._handleTypeCheckboxChange}
                >
                  {mapTypeToDescription("D10")}
                </CheckboxGroupOption>
                <CheckboxGroupOption
                  value="D11"
                  checked={this.state.damagesInImage.D11}
                  onChange={this._handleTypeCheckboxChange}
                >
                  {mapTypeToDescription("D11")}
                </CheckboxGroupOption>
                <CheckboxGroupOption
                  value="D20"
                  checked={this.state.damagesInImage.D20}
                  onChange={this._handleTypeCheckboxChange}
                >
                  {mapTypeToDescription("D20")}
                </CheckboxGroupOption>
                <CheckboxGroupOption
                  value="D40"
                  checked={this.state.damagesInImage.D40}
                  onChange={this._handleTypeCheckboxChange}
                >
                  {mapTypeToDescription("D40")}
                </CheckboxGroupOption>
                <CheckboxGroupOption
                  value="D43"
                  checked={this.state.damagesInImage.D43}
                  onChange={this._handleTypeCheckboxChange}
                >
                  {mapTypeToDescription("D43")}
                </CheckboxGroupOption>
                <CheckboxGroupOption
                  value="D44"
                  checked={this.state.damagesInImage.D44}
                  onChange={this._handleTypeCheckboxChange}
                >
                  {mapTypeToDescription("D44")}
                </CheckboxGroupOption>
              </RadioGroup>
              <div>
                <button
                  class="btn btn-small bg-green link verify"
                  onClick={this._verify}
                >
                  Verify
                </button>
              </div>
            </>
          ) : (
            <div class="row narrow-gutters">
              {this.props.damage.image.reports.map(report => {
                if (report.false_positive) return null;
                else
                  return (
                    <div class="col-auto">
                      <button
                        className={
                          "tag tag-" +
                          report.type +
                          (report.type == this.props.damage.type
                            ? " active"
                            : " link")
                        }
                        onClick={e =>
                          this.props.activateDamage(report.roaddamage_id)
                        }
                      >
                        {mapTypeToDescription(report.type)}
                      </button>
                    </div>
                  );
              })}

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
              {(
                this.props.damage.image.reports.filter(report => (report.verified == true || report.false_positive == true)).length !=
                this.props.damage.image.reports.length
                )  &&
                <button
                class="btn btn-small bg-green link verify"
                onClick={this._verify}>
                  Verify
                </button>
              }
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

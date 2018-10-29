import React, { Component } from "react";

export default class Checkbox extends Component {
  render() {
    return (
      <label class="checkbox">
        <input
          type="checkbox"
          name={this.props.name}
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <span class="box" />
      </label>
    );
  }
}

Checkbox.defaultProps = {
  checked: false
};

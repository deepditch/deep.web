import React, { Component } from "react";

export default class Checkbox extends Component {
  render() {
    return (
      <label class={"checkbox" + (this.props.disabled ? " disabled" : "")}>
        <input type="checkbox" {...this.props} />
        <span class="box" />
      </label>
    );
  }
}

Checkbox.defaultProps = {
  checked: false
};

import React, { Component } from "react";
import { timingSafeEqual } from "crypto";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked ? true : false
    };
  }

  _onChange(e) {
    this.setState({ checked: e.target.checked });
    this.props.onChange(e);
  }

  render() {
    return (
      <label class="checkbox">
        <input
          type="checkbox"
          name={this.props.name}
          value={this.props.value}
          checked={this.state.checked}
          onChange={this._onChange.bind(this)}
        />
        <span class="box" />
      </label>
    );
  }
}

Checkbox.defaultProps = {
  checked: false
};

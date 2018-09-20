
import React, { Component } from 'react';

class InputGroup extends Component {
  render() {
    return (
      <label className="input-group">
        {this.props.name}
        {!this.props.required && <i class="small text-medium-gray"> - Optional</i>}
        <input type="text" />
      </label>
    );
  }
}

export default InputGroup;

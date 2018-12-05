
import React, { Component } from 'react';

/*
 * Component for making an input with label
 */
class InputGroup extends Component {
  render() {
    return (
      <label className="input-group">
        {this.props.hasLabel && this.props.name}
        {!this.props.required && <i class="small text-medium-gray"> - Optional</i>}
        <input {...this.props} />
      </label>
    );
  }
}

export default InputGroup;

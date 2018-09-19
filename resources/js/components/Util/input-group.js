
import React, { Component } from 'react';

class InputGroup extends Component {
  render() {
    return (
      <label className="input-group">
        {this.props.name}
        <input type="text" />
      </label>
    );
  }
}

export default InputGroup;

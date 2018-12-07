
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
 * Component for making an input with label
 */
class InputGroup extends Component {
  static defaultProps = {
    hasLabel: true
 };

  render() {
    const { hasLabel, ...rest } = this.props

    return (
      <label class="input-group">
        {hasLabel ? this.props.name : <></>}
        {!this.props.required && <i class="small text-medium-gray"> - Optional</i>}
        <input {...rest} />
      </label>
    );
  }
}

export default InputGroup;

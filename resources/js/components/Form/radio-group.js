import React, { Component } from "react";

/*
 * Component for creating a radio option. For use within RadioGroup
 */
class RadioGroupOption extends Component {
  render() {
    return (
      <label class="pill">
        <input
          type="radio"
          name={this.props.name}
          value={this.props.value}
          defaultChecked={this.props.defaultChecked}
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <span>{this.props.children ? this.props.children : this.props.value}</span>
      </label>
    );
  }
}

class CheckboxGroupOption extends Component {
  render() {
    return (
      <label class="pill">
        <input
          type="checkbox"
          name={this.props.name}
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <span>{this.props.children ? this.props.children : this.props.value}</span>
      </label>
    );
  }
}

/*
 * Component for creating a group of radio inputs
 */
class RadioGroup extends Component {
  //TODO: Throw error if two children are marked checked
  render() {
    const childrenWithName = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { name: this.props.name })
    );

    return (
      <div class="input-group">
        <div class="pill-radio">{childrenWithName}</div>
      </div>
    );
  }
}

export { RadioGroup, RadioGroupOption, CheckboxGroupOption };

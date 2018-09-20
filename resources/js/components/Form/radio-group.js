import React, { Component } from "react";

/*
 * Component for creating a radio option. For use within RadioGroup
 */
const RadioGroupOption = ({ name, value, defaultChecked , onChange }) => (
  <label class="pill">
    <input
      type="radio"
      name={name}
      value={value}
      defaultChecked ={defaultChecked }
      onChange={onChange}
    />
    <span>{value}</span>
  </label>
);

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
      <label className="input-group">
        <div class="pill-radio">{childrenWithName}</div>
      </label>
    );
  }
}

export { RadioGroup, RadioGroupOption };

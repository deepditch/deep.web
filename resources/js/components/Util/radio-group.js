import React, { Component } from "react";

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

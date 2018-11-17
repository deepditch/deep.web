import React, { Component } from "react";
import Checkbox from "../Form/checkbox";

export class DamageListItem extends Component {
  constructor(props) {
    super(props);
    this.myself = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.active) this.props.scrollToMyself(this.myself.current);
  }

  render() {
    return (
      <tr
        class={this.props.active ? "active" : ""}
        onClick={this.props.activate}
        ref={this.myself}
      >
        <td class="streetname">
          {this.props.damage.position.streetname} (
          {this.props.damage.position.direction})
        </td>
        <td class="type">{this.props.damage.type}</td>
        <td class="status">{this.props.damage.label}</td>
        <td class="verified">
          <Checkbox
            checked={this.props.damage.verified ? true : false}
            disabled
          />
        </td>
      </tr>
    );
  }
}

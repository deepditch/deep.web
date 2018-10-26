import React, { Component } from "react";

export default class ActiveDamage extends Component {
  render() {
    if (!this.props.damage) return null;

    return (
      <div>
        <img width="240px" src={this.props.damage.image} /> <br />
        <h3>Type: {this.props.damage.type}</h3>
      </div>
    );
  }
}

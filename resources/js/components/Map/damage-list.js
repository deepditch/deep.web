import React, { Component } from "react";

class DamageListItem extends Component {
  render() {
    return (
      <li class={this.props.active ? "active" : ""}>
        {this.props.damage.position.street_name} (
        {this.props.damage.position.direction}) {this.props.damage.type}
        {this.props.damage.label} {this.props.damage.verified}
      </li>
    );
  }
}

export default class DamageList extends Component {
  handleListItemClick = (e, damage) => {
    this.props.activateDamage(damage.id);
  }

  render() {
    var listItems = this.props.damages.map(damage => {
      <DamageListItem
        onClick={(e) => this.handleListItemClick(e, damage)}
        damage={damage}
        active={this.props.activeDamageId == damage.id}
      />;
    });

    return <ul>{listItems}</ul>;
  }
}

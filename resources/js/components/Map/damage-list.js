import React, { Component } from "react";

class DamageListItem extends Component {
  render() {
    return (
      <li class={this.props.active ? "active" : ""}>
        {this.props.damage.position.streetname} (
        {this.props.damage.position.direction}) {this.props.damage.type}
        {this.props.damage.label} {this.props.damage.verified}
      </li>
    );
  }
}

export default class DamageList extends Component {
  handleListItemClick = (e, damage) => {
    this.props.activateDamage(damage.id);
  };

  render() {
    console.log(this.props);

    var listItems = this.props.damages.map(damage => (
      <DamageListItem
        key={damage.id}
        onClick={e => this.handleListItemClick(e, damage)}
        damage={damage}
        active={this.props.activeDamageId == damage.id}
      />
    ));

    return <ul>{listItems}</ul>;
  }
}

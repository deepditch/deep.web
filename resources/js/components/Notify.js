import React, { Component } from "react";

class Notify extends Component {
  render() {
    return (
      <div
        id="notify"
        class={this.props.message ? "active" : ""}
        type={this.props.notifyType}
      >
        {this.props.message} <button onClick={this.props.clear}>X Close</button>
      </div>
    );
  }
}

export default Notify;

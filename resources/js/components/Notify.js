import React, { Component } from "react";
import PropTypes from "prop-types";

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

Notify.propTypes = {
  notifyType: PropTypes.string,
  message: PropTypes.node,
  clear: PropTypes.func.isRequired
};

export default Notify;

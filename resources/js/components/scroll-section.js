import React, { Component } from "react";

export default class ScrollSection extends Component {
  render() {
    return (
      <div class="scroll-section" {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

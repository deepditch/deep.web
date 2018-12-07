import React, { Component } from "react";
import ScrollSection from "../scroll-section";

export * from "./damage-filters";
export * from "./damage-list-item";

export default (DamageListItem, DamageFilters) =>
  class DamageList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        filterStreetname: "",
        filterType: "",
        filterStatus: "",
        filterVerified: "",
        scrollTop: 0
      };

      this.scrollSection = React.createRef();
      this.scrollToListItem = this.scrollToListItem.bind(this);
    }

    visibleY(el) {
      var rect = el.getBoundingClientRect(),
        top = rect.top,
        height = rect.height,
        el = el.parentNode;
      // Check if bottom of the element is off the page
      if (rect.bottom < 0) return false;
      // Check its within the document viewport
      if (top > document.documentElement.clientHeight) return false;
      do {
        rect = el.getBoundingClientRect();
        if (top <= rect.bottom === false) return false;
        // Check if the element is out of view due to a container scrolling
        if (top + height <= rect.top) return false;
        el = el.parentNode;
      } while (el != document.body);
      return true;
    }

    scrollToListItem(el) {
      if (!this.visibleY(el)) {
        this.setState({ scrollTop: el.offsetTop });
      }
    }

    render() {
      return (
        <div class="h-100 d-flex flex-column">
          <div class="block-medium-top block-medium-left block-medium-right">
            <DamageFilters />
          </div>
          <div class="flex-1 overflow-hidden">
            <ScrollSection
              ref={this.scrollSection}
              scrollTop={this.state.scrollTop}
            >
            <div class="divide-5"></div>
              <div class="block-medium-left block-medium-right block-medium-bottom">
                <table class="damage-list">
                  <tbody>
                    {this.props.damages &&
                      this.props.damages.map(damageId => (
                        <DamageListItem
                          key={damageId}
                          damageId={damageId}
                          scrollToMyself={this.scrollToListItem}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </ScrollSection>
          </div>
        </div>
      );
    }
  };

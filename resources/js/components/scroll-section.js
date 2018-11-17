import React, { Component } from "react";

export default class ScrollSection extends Component {
  constructor(props) {
    super(props);
    this.div = React.createRef();
    this.doScrolling = this.doScrolling.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.scrollTop != prevProps.scrollTop) {
      this.doScrolling(this.div.current, this.props.scrollTop)
    }
  }

  doScrolling(element, target) {
    target = Math.round(target);
    var diff = Math.abs(element.scrollTop - target)
    console.log(diff)
    var duration = .5 * diff

    if (duration < 0) {
        return Promise.reject("bad duration");
    }
    if (duration === 0) {
        element.scrollTop = target;
        return Promise.resolve();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollTop;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point) {
        if(point <= start) { return 0; }
        if(point >= end) { return 1; }
        var x = (point - start) / (end - start); // interpolation
        return x*x*(3 - 2*x);
    }

    return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        var previous_top = element.scrollTop;

        // This is like a think function from a game loop
        var scroll_frame = function() {
            if(element.scrollTop != previous_top) {
                reject("interrupted");
                return;
            }

            // set the scrollTop for this frame
            var now = Date.now();
            var point = smooth_step(start_time, end_time, now);
            var frameTop = Math.round(start_top + (distance * point));
            element.scrollTop = frameTop;

            // check if we're done!
            if(now >= end_time) {
                resolve();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            if(element.scrollTop === previous_top
                && element.scrollTop !== frameTop) {
                resolve();
                return;
            }
            previous_top = element.scrollTop;

            // schedule next frame for execution
            window.requestAnimationFrame(scroll_frame);
        }

        // boostrap the animation process
        window.requestAnimationFrame(scroll_frame);
    });
  }

  render() {
    const { scrollTop, ...rest } = this.props;

    return (
      <div class="scroll-section" {...rest} ref={this.div}>
        {this.props.children}
      </div>
    );
  }
}

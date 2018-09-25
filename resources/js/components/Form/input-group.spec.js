import React from "react";
import { shallow, mount } from "enzyme";

import InputGroup from "./input-group";

describe("InputGroup", () => {
  it("should render without crashing", () => {
    shallow(<InputGroup />);
  });

  it("should tell the user if a field is optional", () => {
    var input = mount(<InputGroup />);
    expect(input.find('i').text()).toContain('Optional');
  });

  it("should call the callback when changed", () => {
    const spy = jest.fn();
    const radioOption = mount(<InputGroup onChange={spy} />);
    radioOption.find("input").simulate("change");
    expect(spy).toBeCalled();
  });
});

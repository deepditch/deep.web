import React from "react";
import { shallow, mount } from "enzyme";

import { RadioGroup, RadioGroupOption } from "./radio-group";

describe("RadioGroup", () => {
  it("should render without crashing", () => {
    shallow(<RadioGroup />);
  });

  describe("RadioGroupOption", () => {
    it("should render without crashing", () => {
      shallow(<RadioGroupOption />);
    });

    it("show should call the callback when checked", () => {
      const spy = jest.fn();
      const radioOption = mount(<RadioGroupOption onChange={spy} />);
      radioOption.find("input").simulate("change");
      expect(spy).toBeCalled();
    });
  });
});

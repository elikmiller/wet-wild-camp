import React from "react";
import AuthenticatedContainer from "./AuthenticatedContainer.jsx";
import { shallow } from "enzyme";

describe("AuthenticatedContainer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AuthenticatedContainer />);
  });

  it("should render a SideNav component", () => {
    wrapper.find("SideNav").length.should.equal(1);
  });

  it("should render a Route for each nav", () => {
    let numNavs = wrapper.instance().navs.length;
    wrapper.find("Route").length.should.equal(numNavs);
  });
});

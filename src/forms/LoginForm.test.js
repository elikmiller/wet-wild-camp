import React from "react";
import LoginForm from "./LoginForm";
import appClient from "../appClient";
import { shallow } from "enzyme";

describe("LoginForm", () => {
  let wrapper;
  let onSubmit = jest.fn(() => Promise.resolve());
  let mockEvent = { preventDefault: () => {} };

  beforeEach(() => {
    wrapper = shallow(<LoginForm onSubmit={onSubmit} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render an Input for Email Address", () => {
    wrapper.find("Input[name='email']").length.should.equal(1);
  });

  it("should render an Input for Password", () => {
    wrapper.find("Input[name='password']").length.should.equal(1);
  });

  it("should render a Login button", () => {
    wrapper.find("button[type='submit']").length.should.equal(1);
  });

  describe("when user submits form", () => {
    beforeEach(() => {
      wrapper.instance().handleSubmit(mockEvent);
    });

    it("should set wasValidated", () => {
      wrapper.state().wasValidated.should.be.true;
    });

    it("should set some error messages", () => {
      wrapper.state().errors.should.have.property("email");
      wrapper.state().errors.should.have.property("password");
    });

    it("should not have called onSubmit", () => {
      onSubmit.mock.calls.length.should.equal(0);
    });
  });
});

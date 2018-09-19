import React from "react";
import LoginForm from "./LoginForm";
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

  it("should render Input for Email Address", () => {
    wrapper.find("Input[name='email']").length.should.equal(1);
  });

  it("should render Input for Password", () => {
    wrapper.find("Input[name='password']").length.should.equal(1);
  });

  it("should render Login button", () => {
    wrapper.find("button[type='submit']").length.should.equal(1);
  });

  describe("when user inputs no data", () => {
    describe("when user submits form", () => {
      beforeEach(() => {
        wrapper.instance().handleSubmit(mockEvent);
      });

      it("should set wasValidated", () => {
        wrapper.state().wasValidated.should.be.true;
      });

      it("should set error messages in state", () => {
        wrapper.state().errors.email.should.equal("Email Address is required.");
        wrapper.state().errors.password.should.equal("Password is required.");
      });

      it("should not call onSubmit", () => {
        onSubmit.mock.calls.length.should.equal(0);
      });
    });
  });

  describe("when user updates form with invalid email and password fields", () => {
    beforeEach(() => {
      wrapper.instance().handleChange({
        target: { name: "email", value: "invalid_email" }
      });
      wrapper.instance().handleChange({
        target: { name: "password", value: "2short" }
      });
    });

    describe("when user submits form", () => {
      beforeEach(() => {
        wrapper.instance().handleSubmit(mockEvent);
      });

      it("should set error messages in state", () => {
        wrapper
          .state()
          .errors.email.should.equal("Please enter a valid Email Address.");
        wrapper
          .state()
          .errors.password.should.equal(
            "Password must be between 8 and 64 characters."
          );
      });

      it("should not call onSubmit", () => {
        onSubmit.mock.calls.length.should.equal(0);
      });
    });
  });

  describe("when user fills form fields with valid email and password", () => {
    beforeEach(() => {
      wrapper.instance().handleChange({
        target: { name: "email", value: "valid@email.com" }
      });
      wrapper.instance().handleChange({
        target: { name: "password", value: "validlengthpassword" }
      });
    });

    describe("when user submits form", () => {
      beforeEach(() => {
        wrapper.instance().handleSubmit(mockEvent);
      });

      it("should be no error messages in state", () => {
        wrapper.state().errors.should.not.have.property("email");
        wrapper.state().errors.should.not.have.property("password");
      });

      it("should call onSubmit", () => {
        onSubmit.mock.calls.length.should.equal(1);
      });
    });
  });
});

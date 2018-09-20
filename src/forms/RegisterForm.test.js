import React from "react";
import RegisterForm from "./RegisterForm";
import { shallow } from "enzyme";

describe("RegisterForm", () => {
  let wrapper;
  let onSubmit = jest.fn(() => Promise.resolve());
  let mockEvent = { preventDefault: () => {} };

  beforeEach(() => {
    wrapper = shallow(<RegisterForm onSubmit={onSubmit} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render child Input for First Name", () => {
    wrapper.find("Input[name='firstName']").length.should.equal(1);
  });

  it("should render child Input for Last Name", () => {
    wrapper.find("Input[name='lastName']").length.should.equal(1);
  });

  it("should render child Input for Email Address", () => {
    wrapper.find("Input[name='email']").length.should.equal(1);
  });

  it("should render child Input for Password", () => {
    wrapper.find("Input[name='password']").length.should.equal(1);
  });

  it("should render child Input for Confirm Password", () => {
    wrapper.find("Input[name='confirmPassword']").length.should.equal(1);
  });

  it("should render child Login button", () => {
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
        wrapper
          .state()
          .errors.firstName.should.equal("First Name is required.");
        wrapper.state().errors.lastName.should.equal("Last Name is required.");
        wrapper.state().errors.email.should.equal("Email Address is required.");
        wrapper.state().errors.password.should.equal("Password is required.");
        wrapper
          .state()
          .errors.confirmPassword.should.equal("Confirm Password is required.");
      });

      it("child Inputs should receive error messages", () => {
        wrapper.find("Input[name='firstName']").props().error.should.not.be
          .empty;
        wrapper.find("Input[name='lastName']").props().error.should.not.be
          .empty;
        wrapper.find("Input[name='email']").props().error.should.not.be.empty;
        wrapper.find("Input[name='password']").props().error.should.not.be;
        wrapper.find("Input[name='confirmPassword']").props().error.should.not
          .be.empty;
      });

      it("should not call onSubmit", () => {
        onSubmit.mock.calls.length.should.equal(0);
      });
    });
  });

  describe("when user updates form with invalid fields", () => {
    beforeEach(() => {
      wrapper.instance().handleChange({
        target: { name: "email", value: "invalid_email" }
      });
      wrapper.instance().handleChange({
        target: { name: "password", value: "2short" }
      });
      wrapper.instance().handleChange({
        target: { name: "confirmPassword", value: "doesnt_match" }
      });
    });

    describe("when user submits form", () => {
      beforeEach(() => {
        wrapper.instance().handleSubmit(mockEvent);
      });

      it("should set error messages in state", () => {
        wrapper
          .state()
          .errors.firstName.should.equal("First Name is required.");
        wrapper.state().errors.lastName.should.equal("Last Name is required.");
        wrapper
          .state()
          .errors.email.should.equal("Please enter a valid Email Address.");
        wrapper
          .state()
          .errors.password.should.equal(
            "Password must be between 8 and 64 characters."
          );
        wrapper
          .state()
          .errors.confirmPassword.should.equal(
            "Confirmation Password does not match."
          );
      });

      it("child Inputs should receive error messages", () => {
        wrapper.find("Input[name='firstName']").props().error.should.not.be
          .empty;
        wrapper.find("Input[name='lastName']").props().error.should.not.be
          .empty;
        wrapper.find("Input[name='email']").props().error.should.not.be.empty;
        wrapper.find("Input[name='password']").props().error.should.not.be;
        wrapper.find("Input[name='confirmPassword']").props().error.should.not
          .be.empty;
      });

      it("should not call onSubmit", () => {
        onSubmit.mock.calls.length.should.equal(0);
      });
    });
  });

  describe("when user fills form fields with valid input", () => {
    beforeEach(() => {
      wrapper.instance().handleChange({
        target: { name: "firstName", value: "Test" }
      });
      wrapper.instance().handleChange({
        target: { name: "lastName", value: "User" }
      });
      wrapper.instance().handleChange({
        target: { name: "email", value: "valid@email.com" }
      });
      wrapper.instance().handleChange({
        target: { name: "password", value: "validlengthpassword" }
      });
      wrapper.instance().handleChange({
        target: { name: "confirmPassword", value: "validlengthpassword" }
      });
    });

    describe("when user submits form", () => {
      beforeEach(() => {
        wrapper.instance().handleSubmit(mockEvent);
      });

      it("should be no error messages in state", () => {
        wrapper.state().errors.should.not.have.property("firstName");
        wrapper.state().errors.should.not.have.property("lastName");
        wrapper.state().errors.should.not.have.property("email");
        wrapper.state().errors.should.not.have.property("password");
        wrapper.state().errors.should.not.have.property("confirmPassword");
      });

      it("child Inputs should not receive error messages", () => {
        let firstNameErrorExists = !!wrapper
          .find("Input[name='firstName']")
          .props().error;
        firstNameErrorExists.should.be.false;
        let lastNameErrorExists = !!wrapper
          .find("Input[name='lastName']")
          .props().error;
        lastNameErrorExists.should.be.false;
        let emailErrorExists = !!wrapper.find("Input[name='email']").props()
          .error;
        emailErrorExists.should.be.false;
        let passwordErrorExists = !!wrapper
          .find("Input[name='password']")
          .props().error;
        passwordErrorExists.should.be.false;
        let confirmPasswordErrorExists = !!wrapper
          .find("Input[name='confirmPassword']")
          .props().error;
        confirmPasswordErrorExists.should.be.false;
      });

      it("should call onSubmit", () => {
        onSubmit.mock.calls.length.should.equal(1);
      });
    });
  });
});

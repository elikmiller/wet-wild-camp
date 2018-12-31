import React from "react";
import UnauthenticatedContainer, {
  Login,
  Register
} from "./UnauthenticatedContainer.jsx";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { shallow } from "enzyme";

describe("UnauthenticatedContainer", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UnauthenticatedContainer />);
  });

  // it("should render a Terms of Use link", () => {
  //   wrapper.find("a[href='/terms']").length.should.equal(1);
  //   wrapper
  //     .find("a[href='/terms']")
  //     .text()
  //     .should.equal("Terms of Use");
  // });

  // it("should render a Help link", () => {
  //   wrapper.find("a[href='/help']").length.should.equal(1);
  // });

  // it("should render a Privacy Policy link", () => {
  //   wrapper.find("a[href='/privacy']").length.should.equal(1);
  // });
});

describe("Login", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it("should render a LoginForm", () => {
    wrapper.find("LoginForm").length.should.equal(1);
  });

  it("should render a Link to /register", () => {
    wrapper.find("Link").length.should.equal(1);
    wrapper
      .find("Link")
      .props()
      .to.should.equal("/register");
  });
});

describe("ForgotPassword", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ForgotPassword />);
  });

  it("should render a ForgotPasswordForm", () => {
    wrapper.find("ForgotPasswordForm").length.should.equal(1);
  });

  it("should render a Link to /", () => {
    wrapper.find("Link").length.should.equal(1);
    wrapper
      .find("Link")
      .props()
      .to.should.equal("/");
  });
});

describe("Register", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Register />);
  });

  it("should render a RegisterForm", () => {
    wrapper.find("RegisterForm").length.should.equal(1);
  });

  it("should render a Link to /", () => {
    wrapper.find("Link").length.should.equal(1);
    wrapper
      .find("Link")
      .props()
      .to.should.equal("/");
  });
});

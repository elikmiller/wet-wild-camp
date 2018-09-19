import React from "react";
import UnauthenticatedContainer, {
  Login,
  ForgotPassword,
  Register
} from "./UnauthenticatedContainer.jsx";
import { shallow, mount } from "enzyme";
import ReactRouterEnzymeContext from "react-router-enzyme-context";

describe("UnauthenticatedContainer", () => {
  let wrapper;

  beforeEach(() => {
    const context = new ReactRouterEnzymeContext();
    wrapper = mount(<UnauthenticatedContainer />, context.get());
  });

  it("should render a Terms of Use link", () => {
    wrapper.find("a[href='/terms']").length.should.equal(1);
    wrapper
      .find("a[href='/terms']")
      .text()
      .should.equal("Terms of Use");
  });

  it("should render a Help link", () => {
    wrapper.find("a[href='/help']").length.should.equal(1);
  });

  it("should render a Privacy Policy link", () => {
    wrapper.find("a[href='/privacy']").length.should.equal(1);
  });

  describe("when the current path is /", () => {
    beforeEach(() => {
      const context = new ReactRouterEnzymeContext({ initialEntries: ["/"] });
      wrapper.setContext(context.get().context);
    });

    it("should render a Login component", () => {
      wrapper.find(Login).length.should.equal(1);
    });

    it("should not render a ForgotPassword component", () => {
      wrapper.find(ForgotPassword).length.should.equal(0);
    });

    it("should not render a Register component", () => {
      wrapper.find(Register).length.should.equal(0);
    });
  });

  describe("when the current path is /forgot-password", () => {
    beforeEach(() => {
      const context = new ReactRouterEnzymeContext({
        initialEntries: ["/forgot-password"]
      });
      wrapper.setContext(context.get().context);
    });

    it("should not render a Login component", () => {
      wrapper.find(Login).length.should.equal(0);
    });

    it("should render a ForgotPassword component", () => {
      wrapper.find(ForgotPassword).length.should.equal(1);
    });

    it("should not render a Register component", () => {
      wrapper.find(Register).length.should.equal(0);
    });
  });

  describe("when the current path is /register", () => {
    beforeEach(() => {
      const context = new ReactRouterEnzymeContext({
        initialEntries: ["/register"]
      });
      wrapper.setContext(context.get().context);
    });

    it("should not render a Login component", () => {
      wrapper.find(Login).length.should.equal(0);
    });

    it("should not render a ForgotPassword component", () => {
      wrapper.find(ForgotPassword).length.should.equal(0);
    });

    it("should render a Register component", () => {
      wrapper.find(Register).length.should.equal(1);
    });
  });
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

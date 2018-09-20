import React from "react";
import Home from "./Home.jsx";
import { Link } from "react-router-dom";
import { shallow } from "enzyme";

describe("Home", () => {
  let wrapper;
  const onLogin = jest.fn(() => Promise.resolve());
  const onLogout = jest.fn(() => Promise.resolve());
  const onRegister = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    wrapper = shallow(
      <Home
        onLogin={onLogin}
        onLogout={onLogout}
        onRegister={onRegister}
        history={[]}
      />
    );
  });

  it("should have a Link to the root path '/'", () => {
    wrapper.find(Link).length.should.equal(1);
    wrapper
      .find("Link")
      .props()
      .to.should.equal("/");
  });

  describe("when handleLogin is fired", () => {
    beforeEach(async () => {
      await wrapper.instance().handleLogin();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("onLogin is called", async () => {
      onLogin.mock.calls.length.should.equal(1);
    });

    it("history is updated", async () => {
      wrapper
        .instance()
        .props.history.pop()
        .should.contain("/");
    });
  });

  describe("when logout handler is fired", () => {
    beforeEach(async () => {
      await wrapper.instance().handleLogout();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("onLogout is called", async () => {
      onLogout.mock.calls.length.should.equal(1);
    });

    it("history is updated", async () => {
      wrapper
        .instance()
        .props.history.pop()
        .should.contain("/");
    });
  });

  describe("register handler is fired", () => {
    beforeEach(async () => {
      await wrapper.instance().handleRegister();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("onRegister is called", async () => {
      onRegister.mock.calls.length.should.equal(1);
    });

    it("history is updated", async () => {
      wrapper
        .instance()
        .props.history.pop()
        .should.contain("/");
    });
  });

  describe("while authenticated", () => {
    beforeEach(() => {
      wrapper.setProps({
        authenticated: true,
        ...wrapper.instance().props
      });
    });

    it("should display a logout link", () => {
      wrapper.find("a.nav-link").should.have.prop("children", "Logout");
    });

    it("should render an AuthenticatedContainer", () => {
      wrapper.find("AuthenticatedContainer").should.have.lengthOf(1);
    });

    it("should not render an UnauthenticatedContainer", () => {
      wrapper.find("UnauthenticatedContainer").should.have.lengthOf(0);
    });
  });

  describe("while unauthenticated", () => {
    beforeEach(() => {
      wrapper.setProps({
        authenticated: false,
        ...wrapper.instance().props
      });
    });

    it("should not display a logout link", () => {
      wrapper.find("a.nav-link").should.have.lengthOf(0);
    });

    it("should render an UnauthenticatedContainer", () => {
      wrapper.find("UnauthenticatedContainer").should.have.lengthOf(1);
    });

    it("should not render an AuthenticatedContainer", () => {
      wrapper.find("AuthenticatedContainer").should.have.lengthOf(0);
    });
  });
});

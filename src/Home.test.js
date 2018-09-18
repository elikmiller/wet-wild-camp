import React from "react";
import Home from "./Home.jsx";
import { Link } from "react-router-dom";
import { shallow } from "enzyme";

describe("Home", () => {
  let wrapper;
  const onLogin = jest.fn(() => Promise.resolve());
  const onLogout = jest.fn(() => Promise.resolve());

  describe("class methods", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Home onLogin={onLogin} onLogout={onLogout} history={[]} />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should have a Link to the root path '/'", () => {
      wrapper.find(Link).length.should.equal(1);
      wrapper
        .find("Link")
        .props()
        .to.should.equal("/");
    });

    it("should trigger a logout when the logout link is clicked", async () => {
      await wrapper.instance().handleLogout();
      onLogout.mock.calls.length.should.equal(1);
      wrapper
        .instance()
        .props.history.pop()
        .should.contain("/");
    });
  });

  describe("while authenticated", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Home
          authenticated={true}
          onLogin={onLogin}
          onLogout={onLogout}
          history={[]}
        />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
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
    let wrapper;
    const onLogin = jest.fn(() => Promise.resolve());
    const onLogout = jest.fn(() => Promise.resolve());

    beforeEach(() => {
      wrapper = shallow(
        <Home
          authenticated={false}
          onLogin={onLogin}
          onLogout={onLogout}
          history={[]}
        />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
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
